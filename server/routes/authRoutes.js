import { register, signIn } from "../controllers/authController.js";
import {Router} from 'express';

const router = new Router();

router.post("/login",signIn);
router.post("/register",register);

export default router;