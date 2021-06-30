module.exports = (Sequelize, sequelize) => {
   return sequelize.define('sessions', {
      session_id: {
         type: Sequelize.DataTypes.UUID,
         defaultValue: Sequelize.UUIDV4,
         primaryKey: true
      },
      user_id: {
         type: Sequelize.DataTypes.UUID,
         allowNull: true
      },
      phone: {
         type: Sequelize.DataTypes.STRING(12),
         is: /^998[389][01345789][0-9]{7}$/,
         allowNull: false,
         unique: true
      },
      code: {
         type: Sequelize.DataTypes.STRING(64),
         is: /^[0-9]{5}$/
      },
      attempts: {
         type: Sequelize.DataTypes.INTEGER,
         defaultValue: 0
      },
      authorized: {
         type: Sequelize.DataTypes.BOOLEAN,
         defaultValue: false
      },
      user_agent: {
         type: Sequelize.DataTypes.STRING
      },
      ip_address: {
         type: Sequelize.DataTypes.INET
      }
   })
}