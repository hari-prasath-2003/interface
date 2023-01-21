const router = require("express").Router()
const saveBlog = require("../controller/saveBlog")

router.get("/", (req, res) => {
    saveBlog(req.user, req.body.blogId)
})


module.exports = router