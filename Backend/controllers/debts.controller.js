import { truncates } from "bcryptjs";
import { DebtAccount, Debt } from "../models/debts.model.js";
import { deleteDebtItem, updateDebtItem, addItems, addDebt } from "../services/debts.service.js";
import { Types } from "mongoose";

export const createDebtAccount = async (req, res, next) => {
  try {
    const { name, dateTaken, note, items } = req.body;

    //normalize request body to match expected model and validate fields
    const normalizedDebtData = (items || []).map(({ itemName, ...item }) => ({
      ...item,
      name: itemName,
      quantity:
        item.quantity === undefined ||
        item.quantity === null ||
        item.quantity === ""
          ? 1
          : Number(item.quantity),
      price:
        item.price === undefined || item.price === null || item.price === ""
          ? 0
          : Number(item.price),
    }));

    const payload = {
      name,
      debts: [
        {
          items: normalizedDebtData,
          dateTaken,
          note,
        },
      ],
    };

    const debt = await DebtAccount.create(payload);

    res.status(201).json({ success: true, data: debt });
  } catch (error) {
    next(error);
  }
};
export const createDebt = async (req, res, next) => {
  try {
    const {accountId} = req.params;
    const {debts} = req.body;

    const account = await addDebt(accountId, debts);
    if (!account) {
      return (res
        .status(404)
        .json({ success: false, message: "Account not found" }));
    }

    res
      .status(201)
      .json({ success: true, message: "Debt added successfully", data: account });
  } catch (error) {
    next(error)
  }
}

export const getAllDebts = async (req, res, next) => {
  try {
    const debts = await Debt.find();
    res.status(200).json({ success: true, data: debts });
  } catch (error) {
    next(error);
  }
};

export const getCustomerDebts = async (req, res, next) => {
  try {
    const customerDebts = await Debt.find({ _id: req.params.debtId });
    res.status(200).json({ success: true, data: customerDebts });
  } catch (error) {
    next(error);
  }
};

export const updateDebtDetails = async (req, res, next) => {
  try {
    const { action, ...updateData } = req.body;

    let debt;
    if (action == addItem) {
      debt = await Debt.findByIdAndUpdate(
        req.params.debtId,
        { $push: { items: updateData } },
        { runValidators: true, new: true },
      );
    } else {
      debt = await Debt.findByIdAndUpdate(
        req.params.debtId,
        { $set: updateData },
        { returnDocument: "after" },
      );
    }

    res.status(200).json({ success: true, data: debt });
  } catch (error) {
    next(error);
  }
};

export const deleteDebt = async (req, res, next) => {
  try {
    await Debt.findByIdAndUpdate(req.params.debtId, {
      $set: { debtActive: false },
    });

    res
      .status(200)
      .json({ success: true, message: "successfuly deleted debt" });
  } catch (error) {
    next(error);
  }
};

export const updateItems = async (req, res, next) => {
  try {
    const { debtId, itemId } = req.params;
    const { name, price, quantity } = req.body;

    const itemUpdates = {};
    if (name !== undefined) itemUpdates.name = name;
    if (price !== undefined) itemUpdates.price = price;
    if (quantity !== undefined) itemUpdates.quantity = quantity;

    const debt = await updateDebtItem(debtId, itemId, itemUpdates);
    if (!debt) {
      return res
        .status(404)
        .json({ successful: false, message: "Debt not found" });
    }

    res
      .status(200)
      .json({ successful: true, message: "item updated", data: debt });
  } catch (error) {
    next(error);
  }
};

export const deleteItems = async (req, res, next) => {
  try {
    const { debtId, itemId } = req.params;
    const debt = await deleteDebtItem(debtId, itemId);
    if (!debt) {
      return res
        .status(404)
        .json({ successful: false, message: "Debt not found" });
    }
    res
      .status(200)
      .json({ successful: true, message: "item deleted", data: debt });
  } catch (error) {
    next(error);
  }
};

export const createItems = async (req, res, next) => {
  try {
    const { debtId } = req.params;
    const { items } = req.body;

    const newItems = items.map((item) => ({
      name: item.itemName,
      price: Number(item.price),
      quantity: Number(item.quantity),
      _id: new Types.ObjectId(),
    }));
    
    const debt = await addItems(debtId, newItems);

    if (!debt) {/*  */
      return (
        res
          .status(404)
          .json({ successful: false, message: "Debt not found" })
      );
    }

    res
      .status(200)
      .json({ successful: true, message: "items added", data: debt });      

  } catch (error) {
    next(error);
  }
};
