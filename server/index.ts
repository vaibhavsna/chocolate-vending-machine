import "dotenv/config";
import express from "express";
import cors from "cors";
import { getInventory, purchaseChocolate, restockChocolate, getUserBalance, resetMachine } from "./routes/vending";

export function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((req, _res, next) => {
    if (typeof req.body === "string") {
      const s = req.body.trim();
      if (s.startsWith("{") || s.startsWith("[")) {
        try { req.body = JSON.parse(s); } catch { /* noop */ }
      }
    }
    next();
  });
 
  // Quick debug
  app.post("/debug/echo", (req, res) => {
    res.json({
      path: req.path,
      headers: req.headers,
      body: req.body,
      types: {
        chocolateId: typeof req.body?.chocolateId,
        amountPaid: typeof req.body?.amountPaid,
      },
    });
  });
 
  app.get("/inventory", getInventory);
  app.get("/balance", getUserBalance);
  app.post("/purchase", purchaseChocolate);
  app.post("/restock", restockChocolate);
  app.post("/reset", resetMachine);

  return app;
}
