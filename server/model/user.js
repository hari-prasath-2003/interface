const mongoose = require("mongoose")
const blog = require("./blog")
const schema = mongoose.Schema

const userSchema = new schema({
    email: {
        type: String,
        index: {
            unique: true,
        }
    },
    name: {
        type: String,
        required: true
    },
    password: String,
    blogs: [Object],
    saved: [{ type: schema.Types.ObjectId, ref: blog }],
    interest: String

})

module.exports = mongoose.model("user", userSchema)