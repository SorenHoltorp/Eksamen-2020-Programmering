const express = require("express")
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const { mongo } = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    user: {
        type: String,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
        lowercase: true,
        unique: true,
        _someId: Schema.Types.ObjectId,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.plugin(uniqueValidator,{message: "is already taken"});

const User = mongoose.model("user",userSchema)

module.exports = User