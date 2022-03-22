import mongoose from 'mongoose';
var schema = new mongoose.Schema({
    title: {
        type: String,
        // required:true
    },
    body: {
        type: String,
        // required:true
        // unique:true
    },
    author: String,
    date: String,

    comments: [
        { type: String}
    ]
       
})

const Blogdb = mongoose.model("bloge", schema);

module.exports = Blogdb;