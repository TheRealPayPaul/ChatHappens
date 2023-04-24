import express from "express";
import RegisterService from "./register_service";
import asyncHandler from "express-async-handler";
const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    let result = await RegisterService.createUser(req.body);
    res.json(result);
}));

export default router;