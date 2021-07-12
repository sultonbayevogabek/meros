const {
    ProductsGetController,
    ProductsFilterGetController,
    SingleProductGetController,
    ProductsSearchGetController,
} = require("../controllers/product/product-controller");

const router = require("express").Router();

router.get("/:category_slug", ProductsGetController);
router.get("/filter/:category_slug", ProductsFilterGetController);
router.get("/product/:product_id", SingleProductGetController);
router.get("/products/search", ProductsSearchGetController);

module.exports = {
    path: "/shop",
    router,
};
