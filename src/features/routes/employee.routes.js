// Imports
import express from 'express';
import { getSignInForm, registerUser, signIn, logout, getHomePage} from '../controller/employee.controller.js';
import auth from '../../middlewares/auth.js';

// Creating router
const employeeRouter = express.Router();

// Routes
employeeRouter.get('/', auth, getHomePage);
employeeRouter.get('/register', getSignInForm);
employeeRouter.post('/signup', registerUser);
employeeRouter.post('/signin', signIn);
employeeRouter.get('/logout', logout);


// Export
export default employeeRouter;
