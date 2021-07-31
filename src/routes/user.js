import { Router } from 'express';
import { createUser, userLogin } from "../controllers/user";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";



const router = Router();

router.post("/signup", createUser);
router.post("/login", userLogin);

export default router;