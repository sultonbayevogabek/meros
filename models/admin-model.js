module.exports = (Sequelize, sequelize) => {
   return sequelize.define('admins', {
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
         allowNull: false
      },
      email: {
         type: Sequelize.DataTypes.STRING(64),
         is: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
         allowNull: false
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