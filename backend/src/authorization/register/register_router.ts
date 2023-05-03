import express from 'express';
import RegisterController from './register_controller';

const router = express.Router();

/**
 * @Route /api/authorization/register
 *
 * @Requires {
 *      "display_name": "Tobi",
 *      "email": "Email@Tobi.at",
 *      "password": "1234"
 *   }
 *
 * @Returns Statuscode 200 if successful
 * @Returns {
 *       "id": "a2efba41-221f-4b10-875a-a13a016e0cb3",
 *       "email": "Email@Tobi.at",
 *       "display_name": "Tobi",
 *       "created_on": "2023-04-29T14:18:28.418Z"
 *   }
 */
router.post('/', (req, res) => {
    RegisterController.handle(req, res);
});

export default router;
