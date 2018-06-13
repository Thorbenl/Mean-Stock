const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shareSchema = new Schema({
    name: String,
    rates: [{
        value: Number,
        timeStamp: {
            type: Date,
            default: Date.now
        }
    }]
});


module.exports = mongoose.model("Share", shareSchema);

