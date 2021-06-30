module.exports = (Sequelize, sequelize) => {
    return sequelize.define("types", {
        type_id: {
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
    });
};
