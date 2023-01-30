const router = require("express").Router()
const fs = require("fs")
const path = require("path")

router.post("/", async (req, res) => {
    req.on("data", (chunk) => {
        fs.appendFileSync(__dirname + "/images/" + req.headers.filename, chunk)
        res.send()
    })
})


module.exports = router