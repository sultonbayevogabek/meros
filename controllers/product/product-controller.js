const { verifyToken } = require("../../modules/jwt");
const { Op } = require("sequelize");
const fs = require("fs/promises");
const path = require("path");
module.exports = class ProductsController {
    static async ProductsGetController(req, res) {
        try {
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

            const { category_slug } = req.params;
            let { c_page, p_page } = req.query;

            c_page = Number(c_page);
            p_page = Number(p_page);

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

            let category = await categories.findOne({
                where: {
                    slug: category_slug,
                },
                raw: true,
            });

            if (!category) throw new Error("Catetgory not found");

            let all = await products.findAll({
                where: {
                    category_id: category.category_id,
                },
                raw: true,
                limit: p_page ? p_page : 20,
                offset: c_page && p_page ? p_page * (c_page - 1) : 0,
            });

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
                (err, files) => {}
            );

            let partners = await sponsors.findAll({
                raw: true,
            });

            banners = await JSON.parse(banners);

            res.render("index", {
                path: "/",
                title: "Meros | Home",
                user: user,
                products_with_sale: pros,
                categories: cats,
                bestsellers: bests,
                cart: cart,
                wishlist: wishlist,
                banners: banners,
                sponsors: partners,
                products: all,
            });
        } catch (e) {
            res.render("index", {
                error: e + "",
                path: "/",
                title: "Meros | Home",
            });
        }
    }

    static async ProductsFilterGetController(req, res) {
        try {
            let { p_page, c_page, min, max, brand } = req.query;

            c_page = Number(c_page);
            p_page = Number(p_page);
            let products;
            if (brand) {
                let b = await req.db.product_brands.findOne({
                    where: {
                        brand_name: {
                            [Op.iLike]: brand,
                        },
                    },
                    raw: true,
                });
                if (!brand) {
                    throw new Error("Brand not found");
                }
                products = await req.db.products.findAll({
                    where: {
                        product_brand_id: b.product_brand_id,
                        price: {
                            [Op.and]: {
                                [Op.lte]: max,
                                [Op.gte]: min,
                            },
                        },
                    },
                    raw: true,
                });
            } else {
                products = await req.db.products.findAll({
                    raw: true,
                    where: {
                        price: {
                            [Op.and]: {
                                [Op.lte]: max,
                                [Op.gte]: min,
                            },
                        },
                    },
                    limit: p_page,
                    offset: p_page * (c_page - 1),
                });
            }

            res.status(200).json({
                ok: true,
                result: {
                    products,
                },
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async SingleProductGetController(req, res) {
        try {
            const { product_id } = req.params;
            let product = await req.db.products.findOne({
                where: {
                    product_id,
                },
                raw: true,
            });

            let models = await req.db.models.findAll({
                where: {
                    product_id: product.product_id,
                },
                raw: true,
            });

            let colors = await req.db.product_colors.findAll({
                where: {
                    product_id: product.product_id,
                },
                raw: true,
            });

            let comments = await req.db.comments.findAll({
                where: {
                    product_id: product.product_id,
                },
                raw: true,
            });

            let token = req.headers["authorization"];

            let cart = [];
            let user;

            let categories = await req.db.categories.findAll({
                raw: true,
            });

            let comment_thumbs = await req.db.comment_thumbs.findAll({
                raw: true,
            });
            for (let comment of comments) {
                let thumbs = comment_thumbs.filter(
                    (e) => e.comment_id === comment.comment_id
                );
                comment.thumb = [...thumbs];
            }
            if (token) {
                let { session_id } = verifyToken(token);
                if (session_id) {
                    let session = await req.db.sessions.findOne({
                        where: {
                            session_id: session_id,
                        },
                        raw: true,
                    });
                    if (session) {
                        user = await req.db.users.findOne({
                            where: {
                                user_id: session.user_id,
                            },
                        });
                        cart = await req.db.carts.findOne({
                            where: {
                                user_id: session.user_id,
                            },
                            raw: true,
                            include: {
                                model: req.db.products,
                            },
                        });
                    }
                }
            }

            res.status(200).json({
                ok: false,
                result: {
                    cart,
                    product,
                    user,
                    comments,
                    categories,
                    models,
                    colors,
                },
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async CartAddController(req, res) {
        try {
            let token = req.headers["authorization"];
            let { session_id } = verifyToken(token);
            let { product_id, model_id, product_color_id } = req.body;

            let session = await req.db.sessions.findOne({
                where: {
                    session_id,
                },
                raw: true,
            });
            let user = await req.db.users.findOne({
                where: {
                    user_id: session.user_id,
                },
                raw: true,
            });

            let cart = await req.db.carts.findOne({
                where: { user_id: user.user_id, product_id },
                raw: true,
            });

            if (cart) {
                throw new Error("Already added");
            }

            cart = await req.db.carts.create({
                user_id: user.user_id,
                product_id: product_id,
                model_id,
                product_color_id,
            });

            cart = await cart.dataValues;

            res.status(200).json({
                ok: true,
                result: {
                    user,
                    cart_added: cart,
                },
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async CartPlusPatchController(req, res) {
        try {
            let { product_id } = req.body;
            let token = req.headers["authorization"];
            let user;
            let cart;
            if (token) {
                let { session_id } = verifyToken(token);
                let session = await req.db.sessions.findOne({
                    where: { session_id },
                    raw: true,
                });
                user = await req.db.users.findOne({
                    where: {
                        user_id: session.user_id,
                    },
                    raw: true,
                });
                cart = await req.db.carts.increment("count", {
                    by: 1,
                    where: {
                        user_id: user.user_id,
                        product_id,
                    },
                    include: {
                        model: req.db.products,
                    },
                    raw: true,
                    returning: true,
                });
            }
            res.status(200).json({
                ok: true,
                message: "added",
                cart_incremented: cart,
                user: user,
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async CartMinusPatchController(req, res) {
        try {
            let { product_id } = req.body;
            let token = req.headers["authorization"];
            let user;
            let cart;
            if (token) {
                let { session_id } = verifyToken(token);
                let session = await req.db.sessions.findOne({
                    where: { session_id },
                    raw: true,
                });
                user = await req.db.users.findOne({
                    where: {
                        user_id: session.user_id,
                    },
                    raw: true,
                });
                cart = await req.db.carts.findOne({
                    where: {
                        user_id: user.user_id,
                        product_id,
                    },
                    raw: true,
                });
                if (!cart) {
                    throw new Error("Cart is not found");
                }
                if (cart.count === 1) {
                    cart = await req.db.carts.destroy({
                        where: {
                            user_id: user.user_id,
                            product_id,
                        },
                        raw: true,
                        returning: true,
                    });

                    cart = 0;
                } else {
                    cart = await req.db.carts.decrement("count", {
                        by: 1,
                        where: {
                            user_id: user.user_id,
                            product_id,
                        },
                        raw: true,
                        returning: true,
                    });
                }
            }
            res.status(200).json({
                ok: true,
                message: "decremented",
                cart: cart,
                user: user,
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async CartGetController(req, res) {
        try {
            let token = await req.headers["authorization"];
            let user;
            let cart;
            if (token) {
                let { session_id } = verifyToken(token);
                let session = await req.db.sessions.findOne({
                    where: {
                        session_id,
                    },
                    raw: true,
                });
                user = await req.db.users.findOne({
                    where: {
                        user_id: session.user_id,
                    },
                    raw: true,
                });

                cart = await req.db.carts.findAll({
                    where: {
                        user_id: user.user_id,
                    },
                    raw: true,
                    include: {
                        model: req.db.products,
                    },
                });
            }
            res.status(200).json({
                ok: true,
                cart: cart,
                user: user,
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async WishListAddController(req, res) {
        try {
            let token = req.headers["authorization"];
            let { product_id } = req.body;

            let wishlist;
            let user;

            if (token) {
                let { session_id } = verifyToken(token);

                let session = await req.db.sessions.findOne({
                    where: {
                        session_id,
                    },
                    raw: true,
                });
                user = await req.db.users.findOne({
                    where: {
                        user_id: session.user_id,
                    },
                    raw: true,
                });

                wishlist = await req.db.wishlists.findOne({
                    where: {
                        user_id: user.user_id,
                        product_id,
                    },
                    raw: true,
                });

                if (wishlist) {
                    throw new Error("Already added");
                }

                wishlist = await req.db.wishlists.create({
                    user_id: user.user_id,
                    product_id: product_id,
                });
                wishlist = await wishlist.dataValues;
            }

            res.status(200).json({
                ok: true,
                result: {
                    user,
                    wishlist: wishlist,
                },
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async WishlistDeleteController(req, res) {
        try {
            let { product_id } = req.body;

            let token = req.headers["authorization"];

            let user;

            if (token) {
                let { session_id } = verifyToken(token);
                let session = await req.db.sessions.findOne({
                    where: {
                        session_id: session_id,
                    },
                    raw: true,
                });
                user = await req.db.users.findOne({
                    where: {
                        user_id: session.user_id,
                    },
                    raw: true,
                });
                await req.db.wishlists.destroy({
                    where: {
                        user_id: user.user_id,
                        product_id,
                    },
                });
            }

            res.status(200).json({
                ok: true,
                message: "deleted",
            });
        } catch (e) {
            res.status(400).json({
                ok: true,
                message: e + "",
            });
        }
    }

    static async WishListGetController(req, res) {
        try {
            let token = req.headers["authorization"];

            let wishlist;
            let user;

            if (token) {
                let { session_id } = verifyToken(token);

                let session = await req.db.sessions.findOne({
                    where: {
                        session_id,
                    },
                    raw: true,
                });
                user = await req.db.users.findOne({
                    where: {
                        user_id: session.user_id,
                    },
                    raw: true,
                });

                wishlist = await req.db.wishlists.findAll({
                    where: {
                        user_id: user.user_id,
                    },
                    raw: true,
                });
            }

            res.status(200).json({
                ok: true,
                result: {
                    user,
                    wishlist,
                },
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async ProductsSearchGetController(req, res) {
        try {
            let { q, c_page, p_page } = req.query;
            let user;
            let token = req.headers["authorization"];
            if (token) {
                let { session_id } = verifyToken(token);
                let session = await req.db.sessions.findOne({
                    where: {
                        session_id,
                    },
                });
                user = await req.db.users.findOne({
                    where: {
                        user_id: session.user_id,
                    },
                    raw: true,
                });
            }
            let products = await req.db.products.findAll({
                where: {
                    [Op.or]: {
                        uz_name: {
                            [Op.iLike]: `%${q}%`,
                        },
                        ru_name: {
                            [Op.iLike]: `%${q}%`,
                        },
                        en_name: {
                            [Op.iLike]: `%${q}%`,
                        },
                    },
                },
                offset: p_page * (c_page - 1),
                limit: p_page,
                raw: true,
            });
            res.status(200).json({
                ok: true,
                result: {
                    products,
                },
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async CommentsPostController(req, res) {
        try {
            let { comment_text, product_id, star } = req.body;
            const files = req.files;
            let comment;
            let comment_thumbs;
            if (!files) {
                comment = await req.db.comments.create({
                    user_id: req.user.id,
                    product_id,
                    comment_text,
                    star: Number(star),
                });
            } else {
                comment = await req.db.comments.create({
                    user_id: req.user.id,
                    product_id,
                    comment_text,
                    star: Number(star),
                });

                for (let i in files) {
                    if (
                        files[i].mimetype.split("/")[0] !== "image" &&
                        files[i].mimetype.split("/")[0] !== "vector"
                    ) {
                        throw new Error(
                            "Invalid file, file must be type of image"
                        );
                    }

                    let file_type = files[i].mimetype.split("/")[1];

                    let thumb_name = files[i].md5;

                    let thumb_path = path.join(
                        __dirname,
                        "..",
                        "public",
                        "images",
                        "comment_thumbs",
                        `${thumb_name}.${file_type}`
                    );

                    await files[i].mv(thumb_path, (err) => {
                        if (err) throw new Error(err);
                    });

                    await req.db.comment_thumbs.create({
                        thumb: `${thumb_name}.${file_type}`,
                        comment_id: comment.dataValues.comment_id,
                    });
                }
                comment_thumbs = await req.db.comment_thumbs.findAll({
                    where: {
                        comment_id: comment.dataValues.comment_id,
                    },
                    raw: true,
                });
            }
            res.status(201).json({
                ok: true,
                result: {
                    comment: comment.dataValues,
                    comment_thumbs: comment_thumbs,
                },
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async cartGetController(req, res) {
        res.render("cart", {
            title: "Meros | Cart",
            path: "/cart",
            user: req.user,
        });
    }
};
