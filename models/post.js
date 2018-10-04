module.exports = function(sequelize, DataTypes) {
  const Posts = sequelize.define('Posts', {
    ID : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validation: {
        isAlphanumeric: true,
        len: [40]
      },
    },
    Location: {
      type: DataTypes.STRING(5),
      validation: {
        len: [5]
      }
    },
    Body: {
      type: DataTypes.STRING(313),
      validation: {
        len: [313],
        notEmpty: true,
        notNull: true
      }
    },
    Image: {
      type: DataTypes.STRING,
      validation: {
        isUrl: true
      }
    },
    Tags: {
      type: DataTypes.JSON,
    },
    Public: {
      type: DataTypes.BOOLEAN,
    },
    Rating: {
      type: DataTypes.INTEGER
    }
  },{
      paranoid: true
    });

  Posts.associate = function(models) {
    Posts.belongsTo(models.Authors, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  
  return Posts;
};
