const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {type: String, required: true, unique: true, },
    password: {type: String},
    gender: {type: String},
    email: {
        type: String, 
        require: true,
        unique:true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    birthday: {type: String},
   // bio: {type: String}
   userlikeuser: [String]
});

module.exports = mongoose.model("User", userSchema);