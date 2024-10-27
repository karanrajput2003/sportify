const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  logo: { type: String, required: true }, // You may want to make this required if it is essential
  eventCategory: { type: String, required: true }, // Consistent naming
  eventTitle: { type: String, required: true }, // Changed to String
  aboutEvent: { type: String, required: true },
  venue: { type: String, required: true },
  participationType: { type: String, required: true }, // Clarifies what type of participation
  noOfParticipation: { type: Number, required: true }, // Changed to Number
  payment: { type: String, required: true }, // This could be an object for more complex payment details
  socketId: { type: String }, // Optional
  startDate: { type: Date, required: true }, // Changed to Date
  endDate: { type: Date, required: true }, // Changed to Date
  judgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Judges' }, // Assuming you have a Judges model
});

// Create the Events model
const Events = mongoose.model('Events', EventSchema);

module.exports = Events;
