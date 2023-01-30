const router = require("express").Router()
const saveBlog = require("../controller/saveBlog")

router.post("/", (req, res) => {
    saveBlog(req.user, req.body.blogId)
})


module.exports = router