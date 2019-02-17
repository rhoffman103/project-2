const db = require("../models");
const htmlExports = (module.exports = {});


htmlExports.findAllPosts = () => {
    return db.Post.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
        include: [db.Tag, db.Authors]
    });
};