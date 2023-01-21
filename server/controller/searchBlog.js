const Blog = require("../model/blog")


async function searchBlog(query) {
    const blogs = await Blog.find({ $text: { $search: query } })
    console.log(blogs);
}

module.exports = searchBlog