const router = require("express").Router();
const authController = require("../Controller/authController");
// here is the view :
router.use("/",authController.loginPage);
// the login function
router.post("/login", authController.login);

// a signup page
router.use("/signup_page",authController.signupPage)
// a sign up function 
router.post("/signup", authController.signup);

//logout route
router.get("/logout", authController.logout);

module.exports = router;