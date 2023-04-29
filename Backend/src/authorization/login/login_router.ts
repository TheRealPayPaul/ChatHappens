import express from "express";
import LoginController from "./login_controller";
const router = express.Router();

router.post('/', (req, res) => {
    LoginController.handle(req, res);
});

export default router;