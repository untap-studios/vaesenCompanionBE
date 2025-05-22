import './loadenvironment.mjs';
import express from "express";
import authRoutes from "./routes/authRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import gameRoutes from "./routes/gameRoutes.mjs";
// import verifyToken from "./middleware/authMiddleware.mjs";
import cors from "cors";
import db from './db/conn.mjs';

const app = express();
app.use(cors({origin: "*"}));
const PORT = process.env.PORT || 8080;
db();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the User Management API",
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
