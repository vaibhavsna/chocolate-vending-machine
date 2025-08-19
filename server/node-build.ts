import path from "path";
import { createServer } from "./index";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

app.use(express.static(distPath));
app.use("/api", createServer());
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(` Fusion Starter server running on port ${port}`);
  console.log(`Frontend: http://localhost:${port}`);
  console.log(` API: http://localhost:${port}/api`);
});

