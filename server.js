import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import formidable from "express-formidable";
import {
  createEmp,
  getAllEmp,
  loginEmp,
  singleEmp,
  updateEmp,
} from "./controller/EmpController.js";
import { requireSignIn } from "./middleware/authMiddleware.js";

//configure env
dotenv.config();

//connect db
connectDB();

//object of express
const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", loginEmp);
app.post("/create", requireSignIn, createEmp);
app.get("/getEmp", requireSignIn, getAllEmp);
app.get("/singleEmp/:id", requireSignIn, singleEmp);
app.put("/updateEmp/:id", requireSignIn, updateEmp);

app.get("/", (req, res) => {
  res.send("testing");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});
