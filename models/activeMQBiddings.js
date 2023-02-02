'Use strict'

const mongoose = require('mongoose');
const BiddingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    style: {
        type: Number,
        default: 0
    },
    productName: {
        type: String,
        required: true
    },
    bidPrice: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: false
    }
});

const activeMQBidding = mongoose.model('Bidding', BiddingSchema);
module.exports = activeMQBidding;