module.exports = function(sequelize, DataTypes) {
  const Tag = sequelize.define("Tag", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validation: {
        isAlphanumeric: true,
        len: [40]
      }
    },

    tag: {
      type: DataTypes.STRING(50),
      validation: {
        len: [50]
      }
    }
  },
  {
    paranoid: true
  });

  Tag.associate = function(models) {
    Tag.belongsTo(models.Post, {
      // as: "post",
      foreignKey: "PostID"
      // foreignKey: {
      //   allowNull: true
      // }
    });
  };

  Tag.associate = function(models) {
    Tag.belongsTo(models.Authors, {
      foreignKey: "AuthorID"
    });
  };

  return Tag;
};
