const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    imageUrls: [String],
    prompts: [String],
})

module.exports = mongoose.model.User || mongoose.model('User', UserSchema)