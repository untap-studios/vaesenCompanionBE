import './loadenvironment.mjs';
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import db from './db/conn.mjs';
import User from './models/User.mjs';
import jwt from "jsonwebtoken";

const app = express();
app.use(cors({origin: "*"}));
const PORT = process.env.AUTH_PORT || 8081;
db();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET);
    res.status(200).json({ accessToken, refreshToken });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
