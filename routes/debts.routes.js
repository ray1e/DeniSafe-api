import {Router} from "express";
import { createDebt, getAllDebts, getCustomerDebts, updateDebtDetails, deleteDebt } from "../controllers/debts.controller.js";

const DebtRouter = Router();

//CREATE new debt
DebtRouter.post("/", createDebt);

//READ all existing debts
DebtRouter.get("/", getAllDebts);

//READ single customers debt
DebtRouter.get("/:id", getCustomerDebts);

//UPDATE a customers debt details
DebtRouter.patch("/:id", updateDebtDetails);

//DELETE a customers debt
DebtRouter.delete("/:id", deleteDebt);

export default DebtRouter;