module.exports = (Sequelize, sequelize) => {
    return sequelize.define("options", {
        option_id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4(),
            primaryKey: true,
        },
        uz_key: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
        },
        uz_value: {
            type: Sequelize.DataTypes.STRING(128),
            allowNull: false,
        },
        ru_key: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
        },
        ru_value: {
            type: Sequelize.DataTypes.STRING(128),
            allowNull: false,
        },
        en_key: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
        },
        en_value: {
            type: Sequelize.DataTypes.STRING(128),
            allowNull: false,
        },
    });
};
