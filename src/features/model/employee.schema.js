// Creating schema for the employee here.
import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema({
    name: {
        type: String,
        min: [2, "Name should be of 2 or more characters"],
        max: [20, "Name should contain 20 or less characters"],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v); // Basic email validation
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        minlength: [6, "Password should be at least 6 characters long"],
        maxlength: [20, "Password should not exceed 20 characters"],
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Employee'],
        default: 'Employee'
    },
    reviews: {
        given: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Feedback',
            }
        ],
        received: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Feedback',
            }
        ]
    }
}, { timestamps: true });

// Employee model
const EmployeeModel = mongoose.model('Employee', employeesSchema);
export default EmployeeModel;