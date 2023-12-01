// Middleware to verify is user logged in or not here.
const auth = (req,res,next)=>{
    if(req.session.employee)
    {
        next();
    }
    else{
        res.render('404Page', {errorMessage: "Please login to continue brother."});
    }
}

export default auth;