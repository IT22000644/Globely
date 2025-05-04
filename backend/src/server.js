import express from "express";
import connectDB from "./config/db.js";
import { PORT } from "./config/index.js";
import router from "./routes/user.route.js";
import cors from "cors";

const app = express();
const port = PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", router);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
