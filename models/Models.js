module.exports = class Models {
    static async Admin(Sequelize, sequelize) {
        return sequelize.define('admin', {
            admin_id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: Sequelize.DataTypes.STRING(64),
                allowNull: false
            },
            login: {
                type: Sequelize.DataTypes.STRING(64),
                allowNull: false
            },
            phone: {
                type: Sequelize.DataTypes.STRING(12),
                is: /^998[389][01345789][0-9]{7}$/,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.DataTypes.STRING(64),
                is: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.DataTypes.STRING(256),
                allowNull: false
            },
            img: {
                type: Sequelize.DataTypes.STRING(128),
                defaultValue: '/images/cabinet/user-img.png'
            },
            user_agent: {
                type: Sequelize.DataTypes.STRING
            },
            super_admin: {
                type: Sequelize.DataTypes.BOOLEAN
            }
        })
    }
    static async Users(Sequelize, sequelize) {
        return sequelize.define("users", {
            user_id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true,
            },
            full_name: {
                type: Sequelize.DataTypes.STRING(64),
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.DataTypes.STRING(12),
                is: /^998[389][01345789][0-9]{7}$/,
                allowNull: false,
            },
            email: {
                type: Sequelize.DataTypes.STRING(64),
                is: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                allowNull: false,
            },
            role: {
                type: Sequelize.DataTypes.STRING(5),
                isIn: [["user", "admin"]],
                defaultValue: "user",
            },
            user_attempts: {
                type: Sequelize.DataTypes.SMALLINT,
                allowNull: false,
                defaultValue: 0,
            },
            avatar: {
                type: Sequelize.DataTypes.STRING(120),
                defaultValue: '/images/cabinet/user-img.png'
            }
        });
    }
    static async Attempts(Sequelize, sequelize) {
        return sequelize.define("attempts", {
            attempt_id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true,
            },
            code: {
                type: Sequelize.DataTypes.STRING(64),
                allowNull: false,
            },
            attempts: {
                type: Sequelize.DataTypes.SMALLINT,
                allowNull: false,
                defaultValue: 1,
            },
        });
    }
    static async Bans(Sequelize, sequelize) {
        return sequelize.define("bans", {
            ban_id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true,
            },
            expire_date: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
            },
        });
    }
    static async Sessions(Sequelize, sequelize) {
        return sequelize.define("sessions", {
            session_id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_agent: {
                type: Sequelize.DataTypes.STRING(256),
                allowNull: false,
            },
            ip_address: {
                type: Sequelize.DataTypes.INET,
                allowNull: false,
            },
        });
    }
    static async Categories(Sequelize, sequelize) {
        return sequelize.define("categories", {
            category_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            uz_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            ru_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            en_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            slug: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            icon_thumb: {
                type: Sequelize.DataTypes.STRING(128),
                allowNull: false,
            },
            thumb: {
                type: Sequelize.DataTypes.STRING(128),
                allowNull: false,
            },
        });
    }
    static async Types(Sequelize, sequelize) {
        return sequelize.define("types", {
            type_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            uz_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            ru_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            en_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            slug: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        });
    }
    static async SubTypes(Sequelize, sequelize) {
        return sequelize.define("sub_types", {
            sub_type_id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true,
            },
            uz_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            ru_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            en_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            slug: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        });
    }
    static async Products(Sequelize, sequelize) {
        return sequelize.define("products", {
            product_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            product_name: {
                type: Sequelize.DataTypes.STRING(256),
                allowNull: false,
            },
            slug: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
        });
    }
    static async Models(Sequelize, sequelize) {
        return sequelize.define("models", {
            model_id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true,
            },
            uz_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            ru_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            en_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            thumb: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.DataTypes.FLOAT,
                allowNull: false,
            },
            sale: {
                type: Sequelize.DataTypes.FLOAT,
                allowNull: false,
            },
            in_stock: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
        });
    }
    static async ProductColors(Sequelize, sequelize) {
        return sequelize.define("product_colors", {
            product_color_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            thumb: {
                type: Sequelize.DataTypes.STRING(128),
                allowNull: false,
            },
            product_color_name: {
                type: Sequelize.DataTypes.STRING(32),
                allowNull: false,
            },
        });
    }
    static async Options(Sequelize, sequelize) {
        return sequelize.define("options", {
            option_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            uz_key: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            ru_key: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            en_key: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            uz_value: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            ru_value: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            en_value: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
        });
    }
    static async ProductOptions(Sequelize, sequelize) {
        return sequelize.define("product_options", {
            product_option_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
        });
    }
    static async Carts(Sequelize, sequelize) {
        return sequelize.define("carts", {
            cart_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            count: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
        });
    }
    static async Orders(Sequelize, sequelize) {
        return sequelize.define("orders", {
            order_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            shipping_region: {
                type: Sequelize.DataTypes.STRING(64),
                allowNull: false,
            },
            shipping_address: {
                type: Sequelize.DataTypes.STRING,
                allowNUll: false,
            },
            phone_number: {
                type: Sequelize.DataTypes.STRING(12),
                is: /^998[389][01345789][0-9]{7}$/,
                allowNull: false,
            },
            full_name: {
                type: Sequelize.DataTypes.STRING(64),
                allowNull: false,
            },
            is_shipped: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_payed: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            payment_method: {
                type: Sequelize.DataTypes.ENUM,
                values: ["cash", "card"],
                allowNull: false,
            },
        });
    }
    static async OrderDetails(Sequelize, sequelize) {
        return sequelize.define("order_details", {
            order_detail_id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true,
            },
            count: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
            },
        });
    }
    static async Sponsors(Sequelize, sequelize) {
        return sequelize.define("sponsors", {
            sponsor_id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true,
            },
            brand_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            brand_logo: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
        });
    }
    static async Brands(Sequelize, sequelize) {
        return sequelize.define("brands", {
            brand_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValued: Sequelize.DataTypes.UUIDV4,
            },
            brand_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            brand_thumb: {
                type: Sequelize.DataTypes.STRING(128),
                allowNull: false,
            },
        });
    }
    static async Bestsellers(Sequelize, sequelize) {
        return sequelize.define("bestsellers", {
            best_seller_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
        });
    }
    static async WishLists(Sequelize, sequelize) {
        return sequelize.define("wish_lists", {
            wish_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
        });
    }
    static async ProductBrands(Sequelize, sequelize) {
        return sequelize.define("product_brands", {
            product_brand_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4,
            },
            brand_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        });
    }
};
