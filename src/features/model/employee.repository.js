// Employee repository file is here all databse related functions are here.
// Imports
import EmployeeModel from "./employee.schema.js";

// Function to register a new employee
export const register = async(data)=>{
    const newUser = new EmployeeModel(data);
    return await newUser.save();
}

// Function to check if employee exist by email id
export const findEmployeeByEmailId = async(email)=>{
    return await EmployeeModel.findOne({email: email});
}

// Function to delete an employee by id.
export const deleteEmployeeById = async(employeeId)=>{
    return await EmployeeModel.findByIdAndDelete(employeeId);
}

// Function to update an employee details by id.
export const updateEmployeeById = async(employeeId, data)=>{
    return await EmployeeModel.findByIdAndUpdate(employeeId, data, {
        new: true,
        runValidators: true
    })
}