const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    regNo: {
        type: String,
        required: true
    },

    candidateName: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    marks: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model("User", userSchema);