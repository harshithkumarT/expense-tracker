import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const register = async (req, res) => {
  try {
    console.log("Register Request Body:", req.body); // DEBUG LOG
    if (!req.body) {
      return res.status(400).json({ message: " request body is missing" });
    }
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "all three are required" });
    }
    const normalizedEmail = email.toLowerCase();
    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: " password must be more than 6 letters" });
    }

    const existingUser = await pool.query(
      "SELECT 1 FROM users WHERE email = $1",
      [normalizedEmail],
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "email already exist" });
    }

    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await pool.query(
      "INSERT INTO users(name , email ,password) VALUES($1,$2,$3)RETURNING id, name, email",
      [name, normalizedEmail, hashedPassword],
    );

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({
      message: "registerd successfully",
      token,
      user: {
        id: newUser.rows[0].id,
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
      },
    });
  } catch (error) {
    console.error("error in register ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "both email and password are required" });
    }
    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "password must be more than 6 letters" });
    }
    const normalizedEmail = email.toLowerCase();

    const result = await pool.query(
      "SELECT id ,name ,email,password FROM users WHERE email = $1",
      [normalizedEmail],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "sign in successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("error in sign in", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
