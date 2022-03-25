import mongoose from 'mongoose';
var schema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    },
    date:  {type: Date,
         default: Date.now}
})

const Messagedb = mongoose.model("message", schema);

module.exports = Messagedb;