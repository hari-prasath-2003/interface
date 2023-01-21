const User = require("../model/user")

async function saveBlog(email, blogid) {
    const user = await User.findOne({ email: email })
    user.saved.push(blogid)
    user.save()

}

module.exports = saveBlog
