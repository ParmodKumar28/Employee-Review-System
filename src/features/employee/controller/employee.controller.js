// Employee controller is here all views and repository communication is here.
// Imports
import { register, findEmployeeByEmailId, deleteEmployeeById, updateEmployeeById } from "../model/employee.repository.js";
import bcrypt from "bcrypt";
import EmployeeModel from "../model/employee.schema.js";
import { employeeAssignedFeedbacks, feedbacksReceived, submittedFeedbacks } from "../../feedback/model/feedback.repository.js";

// Function to get employee home page.
export const getEmployeeHomePage = async(req,res,next)=>{
    try {
        const feedbacksSubmitted = await submittedFeedbacks(req.session.employee._id);
        const receivedFeedbacks = await feedbacksReceived(req.session.employee._id);
        const feedbacksAssigned = await employeeAssignedFeedbacks(req.session.employee._id);
        res.render('employee-home-page', {employee: req.session.employee,
            feedbacksReceived: receivedFeedbacks.length,
            assignedFeedbacks: feedbacksAssigned.length,
            feedbacksGiven: feedbacksSubmitted.length
            });
    } catch (error) {
        next(error);
    }
}

// Function to get home page or to signin or signup.
export const getSignInForm = async(req,res,next)=>{
    try {
        res.render('home', {employee: null, notification: null});
    } catch (error) {
        next(error)
    }
}

// Registering a new employee.
export const registerUser = async(req,res,next)=>{
    try {
        const {name, email, password} = req.body;
        const newUser = await register({name, email, password});
        let notification;
        if(newUser)
        {
            notification = "User signup successful you can now login";
        }
        return res.render('home', {employee: null, notification});
    } catch (error) {
        return next(error)
    }
}

// Sign in a employee or login.
export const signIn = async (req,res,next)=>{
    try {
        const{email, password} = req.body;
        const employee =  await findEmployeeByEmailId(email);
        let notification;
        if(!employee)
        {
            notification = "This email not exist enter correct email.";
            return res.render('home', {employee: null, notification});
        }
        const isValidPassword =  await bcrypt.compare(password, employee.password);
        if(!isValidPassword)
        {
            notification = "Password not match enter correct password.";
            return res.render('home', {employee: null, notification});
        }
        // Adding employee in cookies for verfication of login process.
        req.session.employee = employee;
        if(employee.role == 'Admin')
        {
            return res.redirect('/api/admin/');
        }
        res.redirect('/api/employee/')  ;      
    } catch (error) {
        return next(error);
    }
}

// Function to delete an employee by id.
export const deleteEmployee = async(req,res,next)=>{
    try {
        const employeeId = req.params.employeeId;
        const isDeleted = await deleteEmployeeById(employeeId);
        let notification;
        if(isDeleted)
        {
            notification = "Employee deleted successfuly."
        }
        const employees = await EmployeeModel.find({}).populate('reviews');
        res.render('all-employees', {employees: employees, employee: req.session.employee, notification: notification});
    } catch (error) {
        next(error);
    }
}

// Function to update and employee by id.
export const updateEmployee = async(req,res,next)=>{
    try {
        const employeeId = req.params.employeeId;
        const data = req.body;
        const isUpdated = await updateEmployeeById(employeeId, data);
        let notification;
        if(isUpdated)
        {
            notification = "Employee updated successfuly."
        }
        const employees = await EmployeeModel.find({}).populate('reviews');
        res.render('all-employees', {employees: employees, employee: req.session.employee, notification: notification});
    } catch (error) {
       next(error); 
    }
}

// Logout
export const logout = async(req,res,next)=>{
    try {
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else
            {
                return res.redirect('/');
            }
        });
    } catch (error) {
        return next(error);
    }
}
