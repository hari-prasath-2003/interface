const blog = require("../model/blog")
const Blog = require("../model/blog")


async function searchBlog(query) {
    const blogs = await Blog.find(
        {
            $text: {
                $search: query
            }
        }
    )
    return blogs
}

module.exports = searchBlog