import {Router} from 'express';
import UserRoutes from './api/v1/user.routes.js';

const router = Router();

router.use('/user', UserRoutes);

export default router;