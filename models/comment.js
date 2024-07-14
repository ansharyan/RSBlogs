const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    remarks: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
})

module.exports = mongoose.model("Comment", commentSchema)