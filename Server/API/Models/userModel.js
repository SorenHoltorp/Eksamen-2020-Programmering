const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String},
    password: {type: String},
    køn: {type: String},
    email: {type: String},
    alder: {type: Number},
    userBillede: {type: String}
});

module.exports = mongoose.model("User", userSchema);