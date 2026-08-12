import mongoose from "mongoose";
import { DebtAccount } from "../models/debts.model.js";
import { Types } from "mongoose";

export const updateDebtItem = async (debtId, itemId, itemUpdates) => {
  const debtObjectId = new mongoose.Types.ObjectId(debtId);
  const itemObjectId = new mongoose.Types.ObjectId(itemId);

  const updatedAccount = await DebtAccount.findOneAndUpdate(
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
                                  $mergeObjects: ["$$item", itemUpdates],
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

  return (
    updatedAccount?.debts?.find((debt) => debt._id.equals(debtObjectId)) ?? null
  );
};

export const deleteDebtItem = async (debtId, itemId) => {
  const debtObjectId = new mongoose.Types.ObjectId(debtId);
  const itemObjectId = new mongoose.Types.ObjectId(itemId);

  const updatedAccount = await DebtAccount.findOneAndUpdate(
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
                          $filter: {
                            input: "$$debt.items",
                            as: "item",
                            cond: { $ne: ["$$item._id", itemObjectId] },
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
    { returnDocument: "after", runValidators: true, updatePipeline: true },
  );

  return (
    updatedAccount?.debts?.find((debt) => debt._id.equals(debtObjectId)) ?? null
  );
};

export const addItems = async (debtId, newItems) => {
  const debtObjectId = new mongoose.Types.ObjectId(debtId);

  const updatedDebt = await DebtAccount.findOneAndUpdate(
    { "debts._id": debtObjectId },
    [
      {
        $set: {
          debts: {
            $map: {
              input: "$debts",
              as: "debt",
              in: {
                $cond: {
                  if: { $eq: ["$$debt._id", debtObjectId] },
                  then: {
                    $mergeObjects: [
                      "$$debt",
                      {
                        items: { $concatArrays: ["$$debt.items", newItems] },
                        totalAmount: {
                          $add: [
                            { $ifNull: ["$$debt.totalAmount", 0] },
                            {
                              $sum: {
                                $map: {
                                  input: newItems,
                                  as: "newItem",
                                  in: {
                                    $multiply: [
                                      "$$newItem.quantity",
                                      "$$newItem.price",
                                    ],
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  else: "$$debt",
                },
              },
            },
          },
        },
      },
    ],
    { returnDocument: "after", runValidators: true, updatePipeline: true },
  );
  return (
    updatedDebt?.debts?.find((debt) => debt._id.equals(debtObjectId)) ?? null
  );
};

export const addDebt = async (accountId, debts) => {
  const accountObjectId = new mongoose.Types.ObjectId(accountId);
  const formattedDebts = debts.map((debt) => ({
    dateTaken: debt.dateTaken ? new Date(debt.dateTaken) : new Date(),
    items: debt.items.map((item) => ({
      name: item.itemName,
      price: Number(item.price),
      quantity: Number(item.quantity),
      _id: new Types.ObjectId(),
    })),
    note: debt.note || "",
    _id: new Types.ObjectId(),
  }));

  const updatedAccount = await DebtAccount.findOneAndUpdate(
    { _id: accountObjectId },
    [
      {
        $set: {
          debts: {
            $concatArrays: [
              { $ifNull: ["$debts", []] },
              {
                $map: {
                  input: formattedDebts,
                  as: "newDebt",
                  in: {
                    _id: "$$newDebt._id",
                    dateTaken: "$$newDebt.dateTaken",
                    items: "$$newDebt.items",
                    note: "$$newDebt.note",
                    totalAmount: {
                      $sum: {
                        $map: {
                          input: "$$newDebt.items",
                          as: "item",
                          in: { $multiply: ["$$item.quantity", "$$item.price"] },
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    ],
    { returnDocument: "after", runValidators: true, updatePipeline: true },
  );
  return (
    updatedAccount ?? null
  );
};
