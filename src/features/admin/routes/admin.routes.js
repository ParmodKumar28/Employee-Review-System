// Imports
import express from 'express';
import auth from '../../../middlewares/auth.js';
import { getAdminHomePage, getAllEmployees, getAssignPage, postAddNewEmployee, postAssignFeedback } from '../controller/admin.controller.js';

// Creating router
const adminRouter = express.Router();

// Routes
adminRouter.get('/', auth, getAdminHomePage);
adminRouter.get('/assign', auth, getAssignPage);
adminRouter.post('/assign', auth, postAssignFeedback);
adminRouter.post('/add-employee', auth, postAddNewEmployee);
adminRouter.get('/employees', auth, getAllEmployees);


// Export
export default adminRouter;