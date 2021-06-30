module.exports = (Sequelize, sequelize) => {
    return sequelize.define("products", {
        product_id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        slug: {
            type: Sequelize.DataTypes.STRING(256),
            allowNull: false,
        },
        uz_name: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
        },
        ru_name: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
        },
        en_name: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
        },
        thumb: {
            type: Sequelize.DataTypes.STRING(256),
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
        description: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        in_stock: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
};
