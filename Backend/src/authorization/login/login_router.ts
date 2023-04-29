import express from "express";
import asyncHandler from "express-async-handler";
import LoginService from "./login_service";
const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    let serviceResult = await LoginService.login(req);
    serviceResult.send(res);
}));

export default router;