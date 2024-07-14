const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    heading:{
        type: String,

    },

    title:{
        type: String,
        required:true,
    },

    content:{
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    imgURL: {
        type:String,
    },
    imgFilename:{
        type: String,
    },
    comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = mongoose.model("Blog", blogSchema);