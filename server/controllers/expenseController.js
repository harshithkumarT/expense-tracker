import pool from "../config/db.js";

export const addExpense = async (req, res) => {
  try {
    //  get logged-in  user id from auth middleware
    const user_id = req.user.id;
    // get data from frontend request body
    const { title, amount, notes, category_id } = req.body;

    // basic validation
    if (!title || !amount) {
      return res
        .status(400)
        .json({ message: " TItle and amount are required" });
    }

    // insert a query
    const newExpense = await pool.query(
      `INSERT INTO expenses(user_id, category_id,title,amount,notes) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [user_id, category_id || null, title, amount, notes || null],
    );
    res.status(201).json(newExpense.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error adding expense",
      error: error.message,
    });
  }
};

// get note
export const getExpense = async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      `SELECT 
        expenses.*,
        categories.name AS category_name
       FROM expenses
       LEFT JOIN categories
       ON expenses.category_id = categories.id
       WHERE expenses.user_id = $1
       ORDER BY expenses.created_at DESC`,
      [user_id],
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: " internal server error",
      error: error.message,
    });
  }
};

// update note
export const updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;
    const { category_id, title, amount, notes } = req.body;
    if (!id) {
      return res.status(400).json({ message: " data is not exist" });
    }
    const result = await pool.query(
      `UPDATE expenses
       SET category_id=$1,
           title=$2,
           amount=$3,
           notes=$4
       WHERE id=$5 AND user_id=$6
       RETURNING *`,
      [category_id || null, title, amount, notes || null, id, user_id],
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;
    const result = await pool.query(
      `DELETE FROM expenses
       WHERE id=$1 AND user_id=$2
       RETURNING *`,
      [id, user_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(201).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
