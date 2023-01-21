const express = require('express')
const app = express()
const port = 3000
const User = require("./model/user")
require('dotenv').config();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const home = require("./routes/home")
const createBlog = require("./routes/createBlog")
const search = require("./routes/search")
const saveBlog = require("./routes/saveBlog")
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/interface').then(() => {
    console.log("Database connected successfully")
})
app.use(express.json())

app.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        if (user.email === req.body.email && user.password === req.body.password) {
            const encId = jwt.sign({ id: user.id }, process.env.SECRETE)
            res.status(200).send(encId)
        }
        else res.status(400).send("wrong credential")
    } else {
        res.send("user dosent exist please signup")
    }

})

app.post("/signup", async (req, res) => {

    const user = await User.findOne({ email: req.body.email })
    if (user) {
        res.send("user name alread taked try another one")

    } else {

        const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        })
        await user.save()
        const encId = jwt.sign({ id: user.id }, process.env.SECRETE)
        res.status(200).send(encId)
    }

})
app.use(loginVerify)
app.use("/home", home)
app.use("/createBlog", createBlog)
app.use("/search", search)
app.use("/save", saveBlog)
function loginVerify(req, res, next) {
    let token = req.headers.authorization
    if (!token) {
        res.status(401).send("please login")
        return
    }
    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRETE, async (err, result) => {
        if (err) {

            res.send("bad token")
        } else {
            const user = await User.findById(result.id)
            if (user) {
                req.user = user.email
                next()
            }
            else {

                res.status(401).send("please login")
            }
        }
    })


}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))