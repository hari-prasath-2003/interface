const Blog = require("../model/blog")
const User = require("../model/user")

async function createBlog(email, blogParam) {
    const newBlog = { ...blogParam, author: email }
    const blog = new Blog(newBlog)
    const user = await User.findOne({ email: email })
    user.blogs.push(blog.id)
    blog.save()
    user.save()

}

module.exports = createBlog
