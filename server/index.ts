import "dotenv/config";
import express from "express";
import cors from "cors";
import { getInventory, purchaseChocolate, restockChocolate, getUserBalance, resetMachine } from "./routes/vending";

export function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get("/api/inventory", getInventory);
  app.get("/api/balance", getUserBalance);
  app.post("/api/purchase", purchaseChocolate);
  app.post("/api/restock", restockChocolate);
  app.post("/api/reset", resetMachine);

  return app;
}
