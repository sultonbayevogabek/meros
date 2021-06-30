const UsersController = require("../controllers/UsersController");

const router = require("express").Router();

router.post("/check-phone", UsersController.CheckPhone);
router.post("/validate-code", UsersController.ValidateCode);
router.post("/signup", UsersController.Signup);
router.post("/login", UsersController.Login);

module.exports = {
    path: "/users",
    router,
};
