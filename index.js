// Importing dotenv
import './dotenv.js';

// Imports
import express, { urlencoded } from 'express';
import ejs from 'ejs';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';
import connectUsingMongoose from './config/mongooseConfig.js';


// Routers imports
import employeeRouter from './src/features/employee/routes/employee.routes.js';
import adminRouter from './src/features/admin/routes/admin.routes.js';
import feedbackRouter from './src/features/feedback/routes/feedback.routes.js';

// Creating server
const app = express();

// Cookie parser
app.use(cookieParser());

// Session created
app.use(session({
    secret : "SecretKey",
    resave : false,
    saveUninitialized : true,
    cookie : ({secure : false}),
}));

// Middleware to encode data from request
app.use(urlencoded({ extended: true }));

// Setting view engine ejs views and ejs layouts
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve('src', 'views')));
app.use(ejsLayouts);

// Public directories
app.use(express.static('src/views'));
app.use(express.static('public'));

// Default route
app.get('/', (req,res,next)=>{
    res.redirect('/api/employee/register');
});

// Routes
app.use('/api/employee', employeeRouter);
app.use('/api/admin', adminRouter);
app.use('/api/feedback', feedbackRouter);

// Error handler
app.use((err,req,res,next)=>{
    console.log(err);
    if (err.name === 'MongoServerError' && err.code === 11000) {
        // Duplicate key error
        return res.status(400).render('404Page', { errorMessage: 'Email already exists.' });
    }
    if(err instanceof mongoose.Error.ValidationError)
    {
        return res.render('404Page', {errorMessage: err.message});
    }
    
    return res.render('404Page', {errorMessage: "Something went wrong on server side."});
});

// Listening server
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is listening on localhost:${PORT}`);
    // Connecting database
    connectUsingMongoose();
});
