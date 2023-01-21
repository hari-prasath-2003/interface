const router = require("express").Router()
const fetchBlog = require("../controller/fetchBlog")

router.get("/", async (req, res) => {
    const recomendedBlog = new Object
    recomendedBlog[recomended] = await fetchBlog(req.user, "forYou")
    recomendedBlog[saved] = await fetchBlog(req.user, "saved")
    recomendedBlog[latest] = await fetchBlog(req.user, "latest")
    console.log(recomendedBlog);
})


module.exports = router