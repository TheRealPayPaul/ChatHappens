import express from "express";
import RegisterController from "./register_controller";
const router = express.Router();

router.post('/', (req, res) => {
    RegisterController.handle(req, res);
});

export default router;