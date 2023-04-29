import express from "express";
import LoginController from "./login_controller";
const router = express.Router();

/**
 * @Route /api/authorization/login
 * 
 * @Requires Basic authorization string inside 'Authorization' header
 * 
 * Email and Password need to be one string sparated by a ':' => email:password
 * This string must be converted into base64
 * Then assemble the Basic authorization string => 'Basic hWAhai='
 * 
 * @Returns Statuscode 200 if successful
 * @Returns 'Set-Cookie' header which holds the JWT Token
 */
router.post('/', (req, res) => {
    LoginController.handle(req, res);
});

export default router;