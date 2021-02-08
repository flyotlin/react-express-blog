const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({
    title: String,
    author: String,
    content: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('ArticleModel', Article);

