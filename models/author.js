module.exports = function(sequelize, DataTypes) {
  const Authors = sequelize.define("Authors", {
    ID : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    UserName : {
      type: DataTypes.STRING,
      notEmpty: true
    },
    email: {
      type: DataTypes.TEXT,
      validate: {
        isEmail: true
      }
    },
    password : {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  }, {
    paranoid: true
  });

  Authors.associate = function(models) {
    Authors.hasMany(models.Posts, {
      onDelete: "cascade"
    });
  };

  return Authors;
};