// Admin controller file is here all contoller code is here.
// Imports

// Function to get admin home page.
export const getAdminHomePage = async(req,res,next)=>{
    try {
        res.render('admin-home-page', {employee: req.session.employee, notification: null});
    } catch (error) {
        next(error);
    }
}