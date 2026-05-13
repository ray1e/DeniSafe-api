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

export const getAllDebts = async (req, res, next) => {
    try {
        const debts = await Debt.find();
        res.status(200).json({success: true, data: debts});
    } catch (error) {
        next(error)
    }
}

export const getCustomerDebts = async (req, res, next) => {
    try { 
        const customerDebts = await Debt.find({_id: req.params.id});
        res.status(200).json({success: true, data: customerDebts});
    } catch (error) {
        next(error)
    }
}

export const updateDebtDetails = async (req, res, next) => {
    try {
        
    } catch (error) {

    }
}