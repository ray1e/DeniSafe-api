import {Router} from "express";
import { createDebt, getAllDebts, getCustomerDebts, updateDebtDetails, updateItemDetails, deleteDebt, deleteItems } from "../controllers/debts.controller.js";
import { Debt } from "../models/debts.model.js";

const DebtRouter = Router();

//CREATE new debt
DebtRouter.post("/", createDebt);

//READ all existing debts
DebtRouter.get("/", getAllDebts);

//READ single customers debt
DebtRouter.get("/:debtId", getCustomerDebts);

//UPDATE a customers debt details
DebtRouter.patch("/:debtId", updateDebtDetails);

//edit details of an item
DebtRouter.patch("/:debtId/items/:itemId", updateItemDetails)

//DELETE item
DebtRouter.delete("/:debtId/items/:itemId", deleteItems)

//DELETE a customers debt
DebtRouter.delete("/:debtId", deleteDebt);



export default DebtRouter;