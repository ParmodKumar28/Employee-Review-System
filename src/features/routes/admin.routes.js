// Imports
import express from 'express';
import auth from '../../middlewares/auth.js';
import { getAdminHomePage } from '../controller/admin.controller.js';

// Creating router
const adminRouter = express.Router();

// Routes
adminRouter.get('/', auth, getAdminHomePage);


// Export
export default adminRouter;