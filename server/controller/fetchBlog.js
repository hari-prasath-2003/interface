const Blog = require("../model/blog")
const User = require("../model/user")

async function fetchBlog(email, query) {

    if (query === "forYou") {
        const user = await User.findOne({ email: email })
        return await Blog.find({ category: user.interest })
    } else if (query === "latest") {
        return await Blog.find().limit(5)
    } else if (query === "saved") {
        const user = await User.findOne({ email: email })
        return await user.populate('saved')
    }
    else {
        return await Blog.find(query)
    }
}

module.exports = fetchBlog
