const mongoose = require('mongoose');
const { trace } = require('../routes/userRoutes');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthday_date: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        ENUM: ADM, USU,
        required: true
    },
    permissionType: {
        type: String,
        required: true
    },
    telefone: {
        type: [String],
        required: true
    },
    endereço: {
        type: String,
        required: true
    },
    numeroCasa:{
        type: String,
        required: true
    }
    
});

const User = mongoose.model('User', userSchema);

module.exports = User