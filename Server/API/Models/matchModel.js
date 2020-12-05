const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    matchName: {type: String},
    matchGender: {type: String},
    // billede: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true }
    matchAlder: {type: Number},
   // userlikes: [{type: ObjectId,ref:"User"}],
  //  comments:[{
  //      text:String,
    //    postedBy:{type:ObjectId,ref:"User"},
 //   }],
  //  postedby:{
   //     type: ObjectId,
  //      ref: "User"
  //  }
})

module.exports = mongoose.model("Match", matchSchema);