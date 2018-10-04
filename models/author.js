module.exports = function(sequelize, DataTypes) {
  const Authors = sequelize.define("Authors", {
    ID : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    UserName : {
      type: DataTypes.STRING,
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