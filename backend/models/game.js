const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Game', gameSchema);
