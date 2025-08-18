import {Router} from 'express';
import UserRoutes from './api/v1/user.routes'

const router = Router();

router.use('/users', UserRoutes);

export default router;