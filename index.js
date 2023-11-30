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
import employeeRouter from './src/features/routes/employee.routes.js';

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
    res.redirect('/api/employee/');
});

// Routes
app.use('/api/employee', employeeRouter);

// Error handler
app.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError)
    {
        return res.render('404Page', {errorMessage: err});
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
