const router = require("express").Router()
const searchBlog = require("../controller/searchBlog")

router.post("/", (req, res) => {
    searchBlog(req.body.query)
    res.send()
})


module.exports = router