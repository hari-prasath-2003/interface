const mongoose = require("mongoose")
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
    saved: [schema.Types.ObjectId],
    interest: [String]

})

module.exports = mongoose.model("user", userSchema)