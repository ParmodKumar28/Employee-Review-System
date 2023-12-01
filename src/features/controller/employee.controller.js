// Employee controller is here all views and repository communication is here.
// Imports
import { register, findEmployeeByEmailId } from "../model/employee.repository.js";
import bcrypt from "bcrypt";


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
        return res.render('employee-home-page', {employee: employee});
    } catch (error) {
        return next(error);
    }
}

// Function to load employee home page.
export const getHomePage = async(req,res,next)=>{
    try {
        return res.render('employee-home-page', {employee: req.session.employee});
    } catch (error) {
        return next(error);
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
