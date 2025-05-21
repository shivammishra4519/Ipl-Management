const { getDB } = require('../config/db');
const { playerSchema } = require('../models/Player');
const { ObjectId } = require('mongodb');

const updatePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;

    // Validate the provided ID
    if (!ObjectId.isValid(playerId)) {
      return res.status(400).json({ message: 'Invalid player ID' });
    }

    // Validate the request body against the player schema
    // For update, allow partial updates: use Joi's `validate` with { presence: 'optional' }
    const { error, value } = playerSchema.validate(req.body, { presence: 'optional' });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const db = getDB();
    const collection = db.collection('players');

    // Update the player document by ID
    const result = await collection.updateOne(
      { _id: new ObjectId(playerId) },
      { $set: value }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json({ message: 'Player updated successfully' });
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;

    // Validate ObjectId
    if (!ObjectId.isValid(playerId)) {
      return res.status(400).json({ message: 'Invalid player ID' });
    }

    const db = getDB();
    const collection = db.collection('players');

    // Attempt to delete the player
    const result = await collection.deleteOne({ _id: new ObjectId(playerId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { updatePlayer ,deletePlayer};
