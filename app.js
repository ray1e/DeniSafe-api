import express from "express";
import DebtRouter from "./routes/debts.routes.js";
import connectToDatabase from "../DeniSafe/database/mongodb.js";

const app = express();

app.use(express.json());
app.use("/api/v1/debts", DebtRouter)

app.get("/", (req, res) => {
    res.send("Welcome to DeniSafe API")
});

app.listen(3000, async () => {
    console.log(`Server is running on http://localhost:${3000}`);
    await connectToDatabase
});