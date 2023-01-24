const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: String,
    imageUrls: [String],
    prompts: [String],
})

module.exports = mongoose.model.User || mongoose.model('User', User)