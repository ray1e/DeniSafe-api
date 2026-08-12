import {Router} from "express";
import { createDebtAccount, createDebt, getAllDebts, getCustomerDebts, updateDebtDetails, updateItems, deleteDebt, deleteItems, createItems } from "../controllers/debts.controller.js";
import { Debt } from "../models/debts.model.js";

export const DebtRouter = Router();
export const CustomerRouter = Router();

//CREATE new account for customer
CustomerRouter.post("/", createDebtAccount);

// Add a debt to customer account
CustomerRouter.post("/:accountId", createDebt)

//Add an item to already existing debt
DebtRouter.post("/:debtId/items", createItems);

//READ all existing debts
DebtRouter.get("/", getAllDebts);

//READ single customers debt
DebtRouter.get("/:debtId", getCustomerDebts);

//UPDATE a customers debt details
DebtRouter.patch("/:debtId", updateDebtDetails);

//edit details of an item
DebtRouter.patch("/:debtId/items/:itemId", updateItems)

//DELETE item
DebtRouter.delete("/:debtId/items/:itemId", deleteItems)

//DELETE a customers debt
DebtRouter.delete("/:debtId", deleteDebt);
