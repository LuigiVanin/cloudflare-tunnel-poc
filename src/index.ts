import express from "express";
import path from "path";
import { kv } from "./infra/db";
import { CounterService } from "./services/counter";

const app = express();

app.use(express.json());

// Adjust paths to point to the root-level folders
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../templates"));
app.use(express.static(path.resolve(__dirname, "../public")));

console.log("Hello via Bun Again!");

const PORT = parseInt(process.env.PORT || "3000", 10);

const counterService = new CounterService(kv);

app.get("/", (_, res) => {
  counterService.Increment();
  const count = counterService.GetCount();

  const pageData = {
    counter: count,
    date: new Date().toLocaleDateString("pt-BR", {
      timeZone: "America/Recife",
    }),
  };

  res.render("index", pageData);
  return;
});

app.post("/api/counter", (req, res) => {
  const json = req.body;
  console.log("Received JSON:", json);

  counterService.Increment();
  const count = counterService.GetCount();
  kv.set("counter", count + 1);

  res.json({
    message: "JSON received successfully!",
    receivedAt: new Date().toISOString(),
    data: {
      counter: count + 1,
      echo: json,
    },
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
