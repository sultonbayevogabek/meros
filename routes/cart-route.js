const router = require("express").Router();

router.get("/", );

router.get("/checkout", async (req, res) => {
    res.render("checkout", {
        title: "Meros | Checkout",
    });
});

module.exports = {
    path: "/cart",
    router,
};
