// Employee controller is here all views and repository communication is here.
// Imports


// Function to get home page or to signin or signup.
export const signIn = async(req,res,next)=>{
    try {
        res.render('home');
    } catch (error) {
        next(error)
    }
}
