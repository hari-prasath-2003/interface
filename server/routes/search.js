const router = require("express").Router()
const searchBlog = require("../controller/searchBlog")

router.get("/", async (req, res) => {
    const blogs = await searchBlog(req.query.q)
    res.send(blogs)
})


module.exports = router