import express from "express";
import RegisterService from "./register_service";
const router = express.Router();

router.post('/', (req, res) => {
    RegisterService.createUser(req.body)
    .then((result) => {
        res.json(result);
    })
    .catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

export default router;