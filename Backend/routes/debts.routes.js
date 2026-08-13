import {Router} from "express";
import { createDebtAccount, createDebt, getAllDebts, getCustomerDebts, updateItems, deleteDebt, deleteItems, createItems } from "../controllers/debts.controller.js";
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
CustomerRouter.get("/:accountId", getCustomerDebts);

//edit details of an item
DebtRouter.patch("/:debtId/items/:itemId", updateItems)

//DELETE item
DebtRouter.delete("/:debtId/items/:itemId", deleteItems)

//DELETE a customers debt
CustomerRouter.patch("/:accountId", deleteDebt);
