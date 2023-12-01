// Imports
import express from 'express';
import { getSignInForm, registerUser, signIn, logout, deleteEmployee, updateEmployee, getEmployeeHomePage} from '../controller/employee.controller.js';
import auth from '../../../middlewares/auth.js';

// Creating router
const employeeRouter = express.Router();

// Routes
employeeRouter.get('/', auth, getEmployeeHomePage);
employeeRouter.get('/register', getSignInForm);
employeeRouter.post('/signup', registerUser);
employeeRouter.post('/signin', signIn);
employeeRouter.get('/logout', logout);
// Admin features
employeeRouter.get('/:employeeId/delete', auth, deleteEmployee);
employeeRouter.post('/:employeeId/update', auth, updateEmployee);


// Export
export default employeeRouter;
