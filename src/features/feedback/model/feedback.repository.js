// Feedbacks repository file is here all database related code is here.
// Imports
import { ObjectId } from "mongodb"
import FeedbackModel from "./feedback.schema.js"
import EmployeeModel from "../../employee/model/employee.schema.js";

// Function to submit a feedback by a employee.
export const submitFeedback = async(feedbackId, feedbackData)=>{
    const feedback = await FeedbackModel.findById(feedbackId);
    feedback.feedback = feedbackData;
    feedback.status = 'success';
    const savedFeedback = await feedback.save();
    // Updating employees sender and receiver.
    const sender = await EmployeeModel.findByIdAndUpdate(savedFeedback.sender, 
        {$push: {'reviews.given': savedFeedback._id}}, 
        {new: true});
    const receiver = await EmployeeModel.findByIdAndUpdate(savedFeedback.receiver, 
        {$push: {'reviews.received': savedFeedback._id}},
        {new: true});
    return savedFeedback;
}

// Function to get assigned feedbacks to a specific employee.
export const employeeAssignedFeedbacks = async(employeeId)=>{
    return await FeedbackModel.find({sender: new ObjectId(employeeId), status: 'pending'}).populate('receiver');
}

// Function to get feedbacks that submitted by specific employee.
export const submittedFeedbacks = async(employeeId)=>{
    return await FeedbackModel.find({sender: new ObjectId(employeeId), status: 'success'}).populate('receiver');
}

// Function to get feedbacks that a specific employee received by other employees.
export const feedbacksReceived = async(employeeId)=>{
    return await FeedbackModel.find({receiver: new ObjectId(employeeId), status: 'success'}).populate('sender');
}

// Function to get pending feedbacks to show to the admin page.
export const getpendingFeedbacks = async()=>{
    return await FeedbackModel.find({status: 'pending'}).populate('sender').populate('receiver');
}

// Function to get successfull feedbacks to show to the admin page.
export const getsuccessfulFeedbacks = async()=>{
    return await FeedbackModel.find({status: 'success'}).populate('sender').populate('receiver');
}

// Function to update feedback only admin allowed.
export const updateFeedback = async(feedbackId, data)=>{
    return await FeedbackModel.findByIdAndUpdate(feedbackId, data, {
        new: true
    });
}