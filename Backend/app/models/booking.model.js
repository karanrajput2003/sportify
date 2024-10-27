const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you're using ObjectId for user reference
        ref: 'User' // Reference to the User model
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you're using ObjectId for event reference
        ref: 'Event' // Reference to the Event model
    },
    name: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED'],
        default: 'PENDING',
    },
    merchantTransactionId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create the Booking model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
