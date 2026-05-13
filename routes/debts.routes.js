import {Router} from "express";
import { createDebt, getAllDebts, getCustomerDebts } from "../controllers/debts.controller.js";

const DebtRouter = Router();

//CREATE new debt
DebtRouter.post("/", createDebt);

//READ all existing debts
DebtRouter.get("/", getAllDebts);

//READ single customers debt
DebtRouter.get("/:id", getCustomerDebts);

//UPDATE a customers debt details
DebtRouter.patch("/:id", (req, res) => {});

//DELETE a customers debt
DebtRouter.delete("/:id", (req, res) => {});

export default DebtRouter;