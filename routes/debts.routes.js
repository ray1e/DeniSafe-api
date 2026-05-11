import {Router} from "express";
import { createDebt } from "../controllers/debts.controller.js";

const DebtRouter = Router();

//CREATE new debt
DebtRouter.post("/", createDebt);

//READ all existing debts
DebtRouter.get("/", (req, res) => {});

//READ single customers debt
DebtRouter.get("/:id", (req, res) => {});

//UPDATE a customers debt
DebtRouter.patch("/:id", (req, res) => {});

//DELETE a customers debt
DebtRouter.delete("/:id", (req, res) => {});

export default DebtRouter;