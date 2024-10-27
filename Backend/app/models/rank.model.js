// models/Rank.js
const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true },
    rank1: { type: String },
    rank2: { type: String },
    rank3: { type: String },
});

const Rank = mongoose.model('Rank', RankSchema);
module.exports = Rank;
