const express = require('express')
const app = express()
const cors = require("cors")
const port = 3000
const User = require("./model/user")
require('dotenv').config();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const home = require("./routes/home")
const createBlog = require("./routes/createBlog")
const search = require("./routes/search")
const saveBlog = require("./routes/saveBlog")
const uploadImg = require("./uploadImg")
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://hari:hari@cluster0.glxgy.mongodb.net/interface?retryWrites=true&w=majority').then(() => {
    console.log("Database connected successfully")
})
app.use("/image", express.static("images"))
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        if (user.email === req.body.email && user.password === req.body.password) {
            const encId = jwt.sign({ id: user.id }, process.env.SECRETE)
            res.status(200).json({ msg: "success", token: encId }).end()
        }
        else res.status(400).send("wrong credential")
    } else {
        res.statusMessage = "user dosent exist please signup"
        res.sendStatus(400)
    }

})

app.post("/signup", async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (user) {
        res.statusMessage = "user email alread taked try another one"
        res.sendStatus(400)

    } else {

        const user = new User({
            email: req.body.email,
            name: req.body.name,
            interest: req.body.interest,
            password: req.body.password
        })
        await user.save()
        const encId = jwt.sign({ id: user.id }, process.env.SECRETE)
        res.status(200).json({ msg: "success", token: encId }).end()
    }

})
app.use("/uploadImg", uploadImg)
app.use(loginVerify)
app.use("/home", home)
app.use("/createBlog", createBlog)
app.use("/search", search)
app.use("/save", saveBlog)
function loginVerify(req, res, next) {
    let token = req.headers.authorization
    if (!token) {
        res.status(400).send("please login")
        return
    }
    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRETE, async (err, result) => {
        if (err) {
            res.status(400).send("bad token")
            console.log(err.message);
        } else {
            const user = await User.findById(result.id)
            if (user) {
                req.user = user.email
                next()
            }
        }
    })


}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))