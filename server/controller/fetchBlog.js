const Blog = require("../model/blog")
const user = require("../model/user")
const User = require("../model/user")

async function fetchBlog(email, query) {

    if (query === "forYou") {
        return await Blog.find({ category: { $in: user.interest } })
    } else if (query === "latest") {
        return await Blog.find().limit(5)
    } else if (query === "saved") {
        return await User.findOne({ email: email }).populate('saved')
    }
    else {
        return await Blog.find(query)
    }
}

module.exports = fetchBlog
