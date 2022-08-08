const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
        nameUser: { type: String, required: true },
        lastNameUser: { type: String, required: true },
        photoUser: { type: String, required: true },
        email: { type: String, required: true },
        country: { type: String, required: true },
        password: [{ type: String, required: true }],
        from: { type: Array },
        uniqueString: { type: String, required: true },
        verification: { type: String, required: true },
})
const User = mongoose.model("users", userSchema)

module.exports = User