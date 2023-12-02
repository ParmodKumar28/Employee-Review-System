// Admin controller file is here all contoller code is here.
// Imports
import { assignFeedback } from "../model/admin.repository.js";
import { register } from "../../employee/model/employee.repository.js";
import EmployeeModel from "../../employee/model/employee.schema.js";
import { feedbacksReceived, getpendingFeedbacks, getsuccessfulFeedbacks, submittedFeedbacks } from "../../feedback/model/feedback.repository.js";
import FeedbackModel from "../../feedback/model/feedback.schema.js";

// Function to get admin home page.
export const getAdminHomePage = async(req,res,next)=>{
    try {
        const pendingFeedbacks = await getpendingFeedbacks();
        const successfulFeedbacks = await getsuccessfulFeedbacks();
        const feedbacksSubmitted = await submittedFeedbacks(req.session.employee._id);
        const receivedFeedbacks = await feedbacksReceived(req.session.employee._id);
        const employees = await EmployeeModel.find({});
        res.render('admin-home-page', {totalEmployees: employees.length, 
            employee: req.session.employee, 
            pendingFeedbacks: pendingFeedbacks.length, 
            successfulFeedbacks: successfulFeedbacks.length, 
            feedbacksGiven: feedbacksSubmitted.length,
            feedbacksReceived: receivedFeedbacks.length
        });
    } catch (error) {
        next(error);
    }
}

// Function to get assign feedback page.
export const getAssignPage = async(req,res,next)=>{
    try {
        const employees = await EmployeeModel.find({});
        res.render('assign-task', {employees: employees, employee: req.session.employee, notification: null});
    } catch (error) {
        next(error);
    }
}

// Function to post assigned feedback by the admin.
export const postAssignFeedback = async(req,res,next)=>{
    try {
        const {sender, receiver} = req.body;
        let notification;
        const employees = await EmployeeModel.find({});
        if(!sender || !receiver)
        {
            notification = "Please select both sender and reciever field cannot be empty."
            return res.render('assign-task', {employees: employees, employee: req.session.employee, notification: notification});
        }
        if(sender === receiver)
        {
            notification = "Sender and receiver both cannot be same."
            return res.render('assign-task', {employees: employees, employee: req.session.employee, notification: notification});
        }
        // Check if already assigned.
        const isAlreadyAssigned = await FeedbackModel.findOne({sender: sender, receiver: receiver, status: 'pending'});
        if(isAlreadyAssigned)
        {
            notification = "Already assigned";
            return res.render('assign-task', {employees: employees, employee: req.session.employee, notification: notification});
        }
        const assignedFeedback = await assignFeedback(sender, receiver);
        if(assignFeedback)
        {
            notification = "Feedback assigned successfully."
        }
        
        res.render('assign-task', {employees: employees, employee: req.session.employee, notification: notification});
    } catch (error) {
        next(error);
    }
}

// Function to get all employees page to admin.
export const getAllEmployees = async(req,res,next)=>{
    try {
        const employees = await EmployeeModel.find({}).populate('reviews');
        res.render('all-employees', {employees: employees, employee: req.session.employee, notification: null});
    } catch (error) {
        next(error);
    }
}

// Function to add new employee.
export const postAddNewEmployee = async(req,res,next)=>{
    try {
        const {name, email, password, role} = req.body;
        const newEmployee = await register({name, email, password, role});
        const employees = await EmployeeModel.find({});
        let notification;
        if(newEmployee)
        {
            notification = "New employee added successfully.";
        }
        res.render('all-employees', {employees: employees, employee: req.session.employee, notification: notification});
    } catch (error) {
        next(error);
    }
}

