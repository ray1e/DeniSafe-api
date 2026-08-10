import mongoose from "mongoose";
import { Account } from "../models/debts.model.js";

export const updateDebtItem = async (debtId, itemId, itemUpdates) => {
  const debtObjectId = new mongoose.Types.ObjectId(debtId);
  const itemObjectId = new mongoose.Types.ObjectId(itemId);

  const updatedAccount = await Account.findOneAndUpdate(
    {
      "debts._id": debtObjectId,
      "debts.items._id": itemObjectId,
    },
    [
      {
        $set: {
          debts: {
            $map: {
              input: "$debts",
              as: "debt",
              in: {
                $cond: [
                  { $eq: ["$$debt._id", debtObjectId] },
                  {
                    $mergeObjects: [
                      "$$debt",
                      {
                        items: {
                          $map: {
                            input: "$$debt.items",
                            as: "item",
                            in: {
                              $cond: [
                                { $eq: ["$$item._id", itemObjectId] },
                                {
                                  $mergeObjects: [
                                    "$$item",
                                    itemUpdates,
                                  ],
                                },
                                "$$item",
                              ],
                            },
                          },
                        },
                      },
                    ],
                  },
                  "$$debt",
                ],
              },
            },
          },
        },
      },
      {
        $set: {
          debts: {
            $map: {
              input: "$debts",
              as: "debt",
              in: {
                $cond: [
                  { $eq: ["$$debt._id", debtObjectId] },
                  {
                    $mergeObjects: [
                      "$$debt",
                      {
                        totalAmount: {
                          $reduce: {
                            input: "$$debt.items",
                            initialValue: 0,
                            in: {
                              $add: [
                                "$$value",
                                {
                                  $multiply: [
                                    { $ifNull: ["$$this.price", 0] },
                                    { $ifNull: ["$$this.quantity", 1] },
                                  ],
                                },
                              ],
                            },
                          },
                        },
                      },
                    ],
                  },
                  "$$debt",
                ],
              },
            },
          },
        },
      },
    ],
    {
      returnDocument: "after",
      runValidators: true,
      updatePipeline: true,
    },
  );

  return updatedAccount?.debts?.find((debt) => debt._id.equals(debtObjectId)) ?? null;
};
