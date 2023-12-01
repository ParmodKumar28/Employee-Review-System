// Admin repository file is here all database related file of admin is here.
// Imports

import EmployeeModel from "../../employee/model/employee.schema.js";
import FeedbackModel from "../../feedback/model/feedback.schema.js"

// Function to assign a feedback to user.
export const assignFeedback = async(sender, receiver)=>{
    const asignedFeedback = await FeedbackModel({
        sender,
        receiver,
        status: 'pending'
    });
    const savedFeedback = await asignedFeedback.save();
    return savedFeedback;
}