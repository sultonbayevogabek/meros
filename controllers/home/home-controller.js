const { Op } = require("sequelize");
const { verifyToken } = require("../../modules/jwt");
const path = require("path");
const fs = require("fs/promises");

module.exports = class HomeController {
    static async HomeGet(req, res) {
        const {
            categories,
            products,
            carts,
            wishlists,
            sessions,
            users,
            bestsellers,
            sponsors,
        } = req.db;

        let token = req.headers["authorization"];

        let cats = await categories.findAll({
            raw: true,
        });

        let wishlist = [];
        let cart = [];
        let user;

        if (token) {
            let { session_id } = verifyToken(token);
            let session = await sessions.findOne({
                where: {
                    session_id,
                },
                raw: true,
            });

            user = await users.findOne({
                user_id: session.user_id,
            });

            wishlist = await wishlists.findAll({
                where: {
                    user_id: req.user.user_id,
                },
                raw: true,
                include: {
                    model: products,
                },
            });

            cart = await carts.findAll({
                where: {
                    user_id: req.user.user_id,
                },
                raw: true,
                include: {
                    model: products,
                },
            });
        }

        let pros = await products.findAll({
            where: {
                sale: {
                    [Op.gt]: 50,
                },
            },
            raw: true,
            limit: 8,
        });

        let bests = await bestsellers.findAll({
            limit: 8,
            raw: true,
            include: {
                model: products,
            },
        });

        let banners = await fs.readFile(
            path.join(__dirname, "..", "banners.json"),
            { encoding: "utf-8" }
        );

        let partners = await sponsors.findAll({
            raw: true,
        });

        banners = await JSON.parse(banners);

        res.render("index", {
            path: "/",
            title: "Meros | Home",
            user: user,
            products: pros,
            categories: cats,
            bestsellers: bests,
            cart: cart,
            wishlist: wishlist,
            banners: banners,
            sponsors: partners,
        });
    }
};
