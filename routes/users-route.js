const UsersController = require("../controllers/users/users-controller");
const dontEnterAuthorized = require('../middlewares/dont-enter-authorized')
const router = require("express").Router();

router.post("/check-phone", UsersController.CheckPhone);
router.post("/validate-code", UsersController.ValidateCode);
router.post("/signup", UsersController.Signup);
router.get("/signup", dontEnterAuthorized, UsersController.getSignUp);
router.post("/login", UsersController.Login);
router.get("/login", dontEnterAuthorized, UsersController.getLogin);

module.exports = {
    path: "/users",
    router,
};
