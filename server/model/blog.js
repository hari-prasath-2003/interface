const mongoosh = require("mongoose")

const blogSchema = new mongoosh.Schema({
    keyword: {
        type: String,
    },
    title: {
        type: String,
        maxLength: 50
    },
    author: {
        type: String,
    },
    content: {
        type: String,
        maxLength: 500
    },
    category: {
        type: String,
    },
    thumbnail: String
})
blogSchema.index({ category: "text", keyword: "text", author: "text", title: "text" })
module.exports = mongoosh.model("blog", blogSchema)