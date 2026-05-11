import Debt from "../models/debts.model.js";

export const createDebt = async (req, res, next) => {
    try {
        const debt = await Debt.create({
            ...req.body,
        });
        res.status(201).json({success: true, data: debt})
    } catch (error) {
        next(error);
    }
}