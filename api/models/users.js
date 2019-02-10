var thinky = require('thinky')();
var type = thinky.type;

// Create a model - the table is automatically created
var Post = thinky.createModel("Post", {
    id: String,
    title: String,
    content: String,
    idAuthor: String
})

module.exports = Post;