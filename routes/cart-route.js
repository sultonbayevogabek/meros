const router = require("express").Router();

router.get("/", async (req, res) => {
    res.render("cart", {
        title: "Meros | Cart",
        path: "/cart",
        user: req.user,
    });
});

router.get("/checkout", async (req, res) => {
    res.render("checkout", {
        title: "Meros | Checkout",
    });
});

module.exports = {
    path: "/cart",
    router,
};
