"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { getUser, updateUser } from '../../controllers/v1/UserController.js';
// import { authenticate } from '../../middlewares/auth.js';
const user_services_1 = require("../../../services/api/v1/user.services");
//import { validate } from '../../utils/validation.js';
const router = express_1.default.Router();
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
        (0, user_services_1.signUpNewUser)(data)
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
exports.default = router;
