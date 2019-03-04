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
  
  // Tag.associate = function(models) {
  //   Tag.belongsTo(models.Authors, {
  //     foreignKey: "AuthorID"
  //   });
  // };
  
  Tag.associate = function(models) {
    Tag.belongsTo(models.Post, {
      foreignKey: "PostID"
    });
  };

  return Tag;
};
