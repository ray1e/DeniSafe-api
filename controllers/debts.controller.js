import { truncates } from "bcryptjs";
import { Debt } from "../models/debts.model.js";

export const createDebt = async (req, res, next) => {
    try {
        const debt = await Debt.create({
            ...req.body,
        });
        res.status(201).json({ success: true, data: debt })
    } catch (error) {
        next(error);
    }
}

export const getAllDebts = async (req, res, next) => {
    try {
        const debts = await Debt.find();
        res.status(200).json({ success: true, data: debts });
    } catch (error) {
        next(error)
    }
}

export const getCustomerDebts = async (req, res, next) => {
    try {
        const customerDebts = await Debt.find({ _id: req.params.debtId });
        res.status(200).json({ success: true, data: customerDebts });
    } catch (error) {
        next(error)
    }
}

export const updateDebtDetails = async (req, res, next) => {
    try {
        const { action, ...updateData } = req.body;

        let debt;
        if (action == addItem) {
            debt = await Debt.findByIdAndUpdate(req.params.debtId, { $push: { items: updateData } }, { runValidators: true, new: true });
        } else {
            debt = await Debt.findByIdAndUpdate(req.params.debtId, { $set: updateData }, { returnDocument: "after" });
        }

        res.status(200).json({ success: true, data: debt });
    } catch (error) {
        next(error);
    }
}

export const deleteDebt = async (req, res, next) => {
    try {
        await Debt.findByIdAndUpdate(req.params.debtId, { $set: { debtActive: false } });

        res.status(200).json({ success: true, message: "successfuly deleted debt" });
    } catch (error) {
        next(error);
    }
}

export const updateItemDetails = async (req, res, next) => {
    try {
        const { debtId, itemId } = req.params;
        const { name, price, quantity } = req.body;
        const updates = { name, price, quantity };

        const setObject = {};

        for (const key in updates) {
            setObject[`items.$[item].${key}`] = updates[key];
        }

        const debt = await Debt.findByIdAndUpdate(
            debtId,
            { $set: setObject },
            {
                arrayFilters: [{ "item._id": itemId }],
                returnDocument: "after",
                runValidators: true
            }
        );

        res.status(200).json({ successful: true, message: "item updated", data: debt });
    } catch (error) {
        next(error);
    }
}

export const deleteItems = async (req, res, next) => {
    try {
        const { debtId, itemId } = req.params;
        const debt = await Debt.findByIdAndUpdate(
            { _id: debtId },
            {
                $pull: {items: {_id: itemId} },
                
            },
            {
                returnDocument: "after"
            }
        );
        res.status(200).json({ successful: true, message: "item deleted", data: debt });
    } catch (error) {
        next(error);
    }
}