// Feedbacks contoller all communications between views and models is here.
// Imports
import { employeeAssignedFeedbacks, feedbacksReceived, getpendingFeedbacks, getsuccessfulFeedbacks, submitFeedback, submittedFeedbacks, updateFeedback } from "../model/feedback.repository.js";

// Function to get assigned tasks to the employee.
export const getAssignedFeedbacks = async(req,res,next)=>{
    try {
        const employeeId = req.session.employee._id;
        const assignedFeedbacks = await employeeAssignedFeedbacks(employeeId);
        res.render('assigned-feedbacks', {employee: req.session.employee, assignedFeedbacks: assignedFeedbacks, notification: null});
    } catch (error) {
        return next(error);
    }
}

// Submit a new feedback.
export const postSubmitFeedback = async(req,res,next)=>{
    try {
        const employeeId = req.session.employee._id;
        const feedbackId = req.params.feedbackId;
        const feedbackData = req.body.feedback;
        const submittedFeedback = await submitFeedback(feedbackId, feedbackData);
        const assignedFeedbacks = await employeeAssignedFeedbacks(employeeId);
        let notification = "Feedback submitted successfuly."
        if(submittedFeedback)
        {
            res.render('assigned-feedbacks', {employee: req.session.employee, assignedFeedbacks: assignedFeedbacks, notification: notification});
        }
    } catch (error) {
        next(error);
    }
}

// Function to get feedbacks received  page for a specific employee.
export const getFeedbackReceived = async(req,res,next)=>{
    try {
        const employeeId = req.session.employee._id;
        const receivedFeedbacks = await feedbacksReceived(employeeId);
        const givenFeedbacks = await submittedFeedbacks(employeeId);
        res.render('received-feedbacks', {employee: req.session.employee, receivedFeedbacks: receivedFeedbacks, givenFeedbacks: givenFeedbacks, notification: null});
    } catch (error) {
        next(error);
    }
}

// Function to get all feedbacks of employess pending and successful to show to the admin page.
export const getAllEmployeesFeedback = async(req,res,next)=>{
    try {
        const pendingFeedbacks = await getpendingFeedbacks();
        const successfulFeedbacks = await getsuccessfulFeedbacks();
        res.render('all-feedbacks', {employee: req.session.employee, pendingFeedbacks: pendingFeedbacks, successfulFeedbacks: successfulFeedbacks});
    } catch (error) {
       next(error); 
    }
}

// Function to update feedback only admin allowed
export const postUpdateFeedback = async(req,res,next)=>{
    try {
        const employeeId = req.session.employee._id;
        const feedbackId = req.params.feedbackId;
        const data = req.body;
        const updatedFeedback = await updateFeedback(feedbackId, data);
        const receivedFeedbacks = await feedbacksReceived(employeeId);
        const givenFeedbacks = await submittedFeedbacks(employeeId);
        let notification;
        if(updatedFeedback)
        {
            notification = "Feedback updated successfuly.";
        }
        res.render('received-feedbacks', {
            employee: req.session.employee,
            receivedFeedbacks: receivedFeedbacks,
            givenFeedbacks: givenFeedbacks,
            notification: notification
            });
    } catch (error) {
        next(error);
    }
}