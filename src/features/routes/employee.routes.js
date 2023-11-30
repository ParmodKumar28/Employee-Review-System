// Imports
import express from 'express';
import { signIn } from '../controller/employee.controller.js';

// Creating router
const employeeRouter = express.Router();

// Routes
employeeRouter.get('/', signIn);

// Export
export default employeeRouter;
