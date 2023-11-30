// Schema for the feedback is here.
import mongoose from "mongoose";

const feedbacksSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employee'
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employee'
    },
    status: {
        type: String,
        enum: ['pending', 'success'],
        default: 'pending'
    },
}, { timestamps: true });

// Feedback model
const FeedbackModel = mongoose.model('Feedback', feedbacksSchema);
export default FeedbackModel;