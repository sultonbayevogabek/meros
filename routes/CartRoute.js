const {
   CartAddController,
   CartPlusPatchController,
   CartMinusPatchController,
   CartGetController,
   cartGetController
} = require("../controllers/product/product-controller");
const dontEnterNotAuthorized = require('../middlewares/dont-enter-not-authorized')

const router = require("express").Router();

router.post("/api/add", CartAddController);
router.patch("/api/plus", CartPlusPatchController);
router.patch("/api/minus", CartMinusPatchController);
router.get("/api/", CartGetController);
router.get('/', dontEnterNotAuthorized, cartGetController)

module.exports = {
   path: "/cart",
   router,
};
