import express from 'express';
//import { getUser, updateUser } from '../../controllers/v1/UserController.js';
// import { authenticate } from '../../middlewares/auth.js';
import { signUpNewUser } from '@services/user.services.js';
//import { validate } from '../../utils/validation.js';
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        //const user = await getUser(req.user.id);
        // res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json({ error: 'Email or password is required to update user.' });
        }
        // if (email) {
        //     validate(email);
        //     if (!validate(email)) {
        //         return res.status(400).json({ error: 'Invalid email format.' });
        //     }
        // }
        // if (password) {
        //     validate(password);
        //     if (!validate(password)) {
        //         return res.status(400).json({ error: 'Invalid password format.' });
        //     }
        // }
        //const updatedUser = await updateUser(req.user.id, { email, password });
        //res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/', async (req, res) => {
    try {
        const data = req.body.data;
        signUpNewUser(data)
            .then(data => {
            res.status(201).json({ data, message: 'User created successfully.' });
        })
            .catch(error => {
            console.error('Error creating user:', error);
            res.status(400).json({ error: 'Error creating user.', message: error.message });
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});
export default router;
//# sourceMappingURL=user.routes.js.map