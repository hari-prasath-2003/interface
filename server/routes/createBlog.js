const router = require("express").Router()
const createBlog = require("../controller/createBlog")

router.post("/", async (req, res) => {
    const blog = req.body
    console.log(blog);
    await createBlog(req.user, blog)
    res.status(201).send("success")
})


module.exports = router