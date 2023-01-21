const Blog = require("../model/blog")
const User = require("../model/user")

async function createBlog(email, blogParam) {
    const blog = new Blog(blogParam)
    const user = await User.findOne({ email: email })
    user.blogs.push(blog.id)
    blog.save()
    user.save()

}

module.exports = createBlog
