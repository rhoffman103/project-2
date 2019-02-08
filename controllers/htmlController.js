const db = require("../models");
const htmlExports = (module.exports = {});


htmlExports.findAllPosts = () => {
    return db.Post.findAll({
        include: [db.Tag, db.Authors]
    });
};