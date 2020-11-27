const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    matchName: {type: String},
    matchKøn: {type: String},
    // billede: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true }
    matchAlder: {type: Number}
});

module.exports = mongoose.model("Match", matchSchema);