const mongoose = require("mongoose")

// Giver mit Schema et masse beskrivelse som objekter
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
        default: Date.now
    },
})

//Sådan som vores skema vil se ud
mongoose.Schema({
    username: String,
    password: String,
})
//Exportere schema til MongoDB

module.exports = mongoose.model("Posts", PostSchema);