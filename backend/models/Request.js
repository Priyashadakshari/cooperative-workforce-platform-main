const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    customerId: String,
    rawText: String,
    service: String,
    urgency: String,
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);