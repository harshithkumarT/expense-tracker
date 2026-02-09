import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addExpense, getExpense, updateExpense, deleteExpense } from "../controllers/expenseController.js";


const router = new Router();
router.use(authMiddleware);

router.post("/expenses", addExpense);
router.get("/expenses", getExpense);
router.put('/expenses/:id', updateExpense)
router.delete('/expenses/:id', deleteExpense);

export default router;