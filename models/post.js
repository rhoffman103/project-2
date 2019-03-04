module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define("Post",
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        validation: {
          isAlphanumeric: true,
          len: [40]
        }
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
      Public: {
        type: DataTypes.BOOLEAN
      },
      Rating: {
        type: DataTypes.INTEGER
      },
      UserName: {
        type: DataTypes.STRING,
        notEmpty: true
      }
    },
    {
      paranoid: true
    }
  );

  Post.associate = function(models) {
    Post.hasMany(models.Tag, {
      foreignKey: "PostID",
      onDelete: "cascade"
    });

    Post.belongsTo(models.Authors, {
      foreignKey: // "AuthorID"
      {
        allowNull: true
      }
    });
  };

  return Post;
};
