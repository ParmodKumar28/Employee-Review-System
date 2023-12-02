// Imports
import express from 'express';
import auth from '../../../middlewares/auth.js';
import { getAllEmployeesFeedback, getAssignedFeedbacks, getFeedbackReceived, postSubmitFeedback, postUpdateFeedback } from '../controller/feedback.controller.js';

// Creating router
const feedbackRouter = express.Router();

// Routes
feedbackRouter.get('/assigned',auth, getAssignedFeedbacks);
feedbackRouter.post('/:feedbackId/submit', auth, postSubmitFeedback);
feedbackRouter.get('/received', auth, getFeedbackReceived);
feedbackRouter.get('/employees-feedback', auth, getAllEmployeesFeedback);
feedbackRouter.post('/:feedbackId/update', auth, postUpdateFeedback);


// Export
export default feedbackRouter;