# Employee Review System

Employee reviews system is a project on performance reviews management of employees. Here the employee need to create there account and login and admin assign feedback to employees to take feedback
for other employees and admin can see all reviews and assign tasks and view and edit details of all employees also can remove. The admin can promote other employees to admin and also can give feedbacks.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Code Samples](#code-samples)
- [Contributors](#contributors)


## Introduction

The Employee Review System is designed to streamline the process of employee feedback and performance evaluation. It includes functionalities for both employees and administrators:

- **Employees**: Can submit feedback on their peers' performance which are assigned to them by admin, view received feedback, and view submitted feedbacks.
- **Administrators**: Have access to an admin dashboard to oversee all reviews, assign feedback tasks, manage employees, and view aggregated performance data.

## Features

- **User Authentication**: Secure login system for employees and admins.
- **Feedback Submission**: Employees can provide feedback on their peers.
- **Performance Metrics**: Visualization of performance statistics.
- **Admin Dashboard**: A dedicated space for administrators to manage reviews and employees and give feedbacks and also can update their feedbacks.
- **Employee Management**: CRUD operations for employee records.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ParmodKumar28/Employee-Review-System.git

2.Navigate to the root directory:
- cd Employee-Review-System

Install dependenciefa-spin
- npm install

## Usage

1. Start the application
- npm Start

2. Access the application in a web browser: `http://localhost:<Port-Number>`

## Technologies Used

- Node.js
- Express
- MongoDB 
- Mongoose 
- bcrypt 
- dotenv 
- ejs
- express-session 
- express-ejs-layouts 
- cookie-parser 

## Folder Structure 
`/src`: Contains all project source files 
`/public`: Public assets like Css folder for style code and assets folder for logo
`/views`: EJS view templates 
`/config`: Configration files like database connections

## Routes
-There are three features following mvc pattern in the src folder and there routes are:-

## Feedback Routes
### feedbackRouter.get('/assigned',auth, getAssignedFeedbacks);
### feedbackRouter.post('/:feedbackId/submit', auth, postSubmitFeedback);
### feedbackRouter.get('/received', auth, getFeedbackReceived);
### feedbackRouter.get('/employees-feedback', auth, getAllEmployeesFeedback);
### feedbackRouter.post('/:feedbackId/update', auth, postUpdateFeedback);
   
## Employee Routes
### employeeRouter.get('/', auth, getEmployeeHomePage);
### employeeRouter.get('/register', getSignInForm);
### employeeRouter.post('/signup', registerUser);
### employeeRouter.post('/signin', signIn);
### employeeRouter.get('/logout', logout);
### Admin features
### employeeRouter.get('/:employeeId/delete', auth, deleteEmployee);
### employeeRouter.post('/:employeeId/update', auth, updateEmployee);

## Admin Routes
### adminRouter.get('/', auth, getAdminHomePage);
### adminRouter.get('/assign', auth, getAssignPage);
### adminRouter.post('/assign', auth, postAssignFeedback);
### adminRouter.post('/add-employee', auth, postAddNewEmployee);
### adminRouter.get('/employees', auth, getAllEmployees);

## Thankyou, I tried to make this project ui cool enough and attractive and easy to use and i used Html, Css, Javascript and Bootstrap for that and i hope you will like this.
Follow on github for more.

### Github Repository: - https://github.com/ParmodKumar28/Employee-Review-System
### Hosted Url:-  https://employee-review-system-r8tw.onrender.com/api/employee/register
### Video Link: - https://youtu.be/mvHhUozvC0w
