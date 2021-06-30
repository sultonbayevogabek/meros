const UsersController = require("../controllers/users/UsersController");

const router = require("express").Router();

router.post("/check-phone", UsersController.CheckPhone);
router.post("/validate-code", UsersController.ValidateCode);
router.post("/signup", UsersController.Signup);
router.get("/signup", UsersController.getSignUp);
router.post("/login", UsersController.Login);
router.get("/login", UsersController.getLogin);

module.exports = {
    path: "/users",
    router,
};
