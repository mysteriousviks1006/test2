const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
         type: String,
         required: true
     },
     createdAt: Date,
     updatedAt: Date
});

module.exports = mongoose.model('User', userSchema);