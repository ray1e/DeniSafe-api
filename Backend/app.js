import express from "express";
import DebtRouter from "./routes/debts.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use("/api/v1/debts", DebtRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to DeniSafe API");
});

app.listen(3000, async () => {
  console.log(`Server is running on http://localhost:${3000}`);
  await connectToDatabase();
});
