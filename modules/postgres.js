const { Sequelize } = require("sequelize");

const Models = require("../models/Models");

const dbConnection = "postgres://wccqxinj:G8x2RtkZcByxUkcx3OL0D0Z_DcufEdgh@batyr.db.elephantsql.com/wccqxinj"
const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/meros', {
        logging: false
    }
)

module.exports = async function () {
    try {
        const db = {};

        db.users = await Models.Users(Sequelize, sequelize);
        db.attempts = await Models.Attempts(Sequelize, sequelize);
        db.sessions = await Models.Sessions(Sequelize, sequelize);
        db.bans = await Models.Bans(Sequelize, sequelize);
        db.categories = await Models.Categories(Sequelize, sequelize);
        db.types = await Models.Types(Sequelize, sequelize);
        db.sub_types = await Models.SubTypes(Sequelize, sequelize);
        db.models = await Models.Models(Sequelize, sequelize);
        db.product_colors = await Models.ProductColors(Sequelize, sequelize);
        db.products = await Models.Products(Sequelize, sequelize);
        db.product_options = await Models.ProductOptions(Sequelize, sequelize);
        db.carts = await Models.Carts(Sequelize, sequelize);
        db.options = await Models.Options(Sequelize, sequelize);
        db.orders = await Models.Orders(Sequelize, sequelize);
        db.sponsors = await Models.Sponsors(Sequelize, sequelize);
        db.brands = await Models.Brands(Sequelize, sequelize);
        db.best_sellers = await Models.Bestsellers(Sequelize, sequelize);
        db.wishlists = await Models.WishLists(Sequelize, sequelize);
        db.order_details = await Models.OrderDetails(Sequelize, sequelize);
        db.product_brands = await Models.ProductBrands(Sequelize, sequelize);
        db.admin = await Models.Admin(Sequelize, sequelize)

        await db.users.hasOne(db.attempts, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.attempts.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.users.hasOne(db.bans, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.bans.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.users.hasMany(db.sessions, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.sessions.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.users.hasMany(db.carts, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.carts.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.users.hasMany(db.orders, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.orders.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.users.hasMany(db.wishlists, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.wishlists.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            },
        });

        await db.categories.hasMany(db.products, {
            foreignKey: {
                name: "category_id",
                allowNull: false,
            },
        });

        await db.products.belongsTo(db.categories, {
            foreignKey: {
                name: "category_id",
                allowNull: false,
            },
        });

        await db.products.hasMany(db.models, {
            foreignKey: {
                name: "product_id",
                allowNull: false,
            },
        });

        await db.models.belongsTo(db.products, {
            foreignKey: {
                name: "product_id",
                allowNull: false,
            },
        });

        await db.products.hasMany(db.product_colors, {
            foreignKey: {
                name: "product_id",
                allowNull: false,
            },
        });

        await db.options.hasMany(db.product_options, {
            foreignKey: {
                name: "option_id",
                allowNull: false,
            },
        });

        await db.product_options.belongsTo(db.options, {
            foreignKey: {
                name: "option_id",
                allowNull: false,
            },
        });

        await db.models.hasMany(db.product_options, {
            foreignKey: {
                name: "model_id",
                allowNull: false,
            },
        });

        await db.product_options.belongsTo(db.models, {
            foreignKey: {
                name: "model_id",
                allowNull: false,
            },
        });

        await db.orders.hasMany(db.order_details, {
            foreignKey: {
                name: "order_id",
                allowNull: false,
            },
        });

        await db.order_details.belongsTo(db.orders, {
            foreignKey: {
                name: "order_id",
                allowNull: false,
            },
        });

        await db.categories.hasMany(db.brands, {
            foreignKey: {
                name: "category_id",
                allowNull: false,
            },
        });

        await db.brands.belongsTo(db.categories, {
            foreignKey: {
                name: "category_id",
                allowNull: false,
            },
        });

        await db.products.hasOne(db.product_brands, {
            foreignKey: {
                name: "product_id",
                allowNull: false,
            },
        });

        await db.product_brands.belongsTo(db.products, {
            foreignKey: {
                name: "product_id",
                allowNull: false,
            },
        });
        //
        // let admin = await db.admin.create({
        //     name: `Og'abek`,
        //     login: 'meros_admin',
        //     phone: '998999639773',
        //     email: 'admin@meros.com',
        //     password: 'meros_admin1999',
        //     img: 'https://picsum.photos/300',
        //     user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        //     super_admin: true
        // })
        //
        // console.log(admin)
        //
        // await sequelize.sync({ force: true })

        return db;
    } catch (e) {
        console.log(e + "");
    }
};
