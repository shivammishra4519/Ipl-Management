const { getDB } = require('../config/db');
const { playerSchema } = require('../models/Player');
const { ObjectId } = require('mongodb');

const addPlayer = async (req, res) => {
  try {
    const { error, value } = playerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const db = getDB();
    const collection = db.collection('players');
    const insertResult = await collection.insertOne(value);

    res.status(201).json({
      message: 'Player created successfully',
      playerId: insertResult.insertedId
    });
  } catch (error) {
    console.error('Error adding player:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const addPlayersMany = async (req, res) => {
  try {
    const players = req.body;

    // Ensure the request body is an array
    if (!Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array of players' });
    }

    // Validate each player and collect valid ones
    const validatedPlayers = [];
    for (const player of players) {
      const { error, value } = playerSchema.validate(player);
      if (error) {
        return res.status(400).json({ message: `Validation error in one of the players: ${error.details[0].message}` });
      }
      validatedPlayers.push(value);
    }

    const db = getDB();
    const collection = db.collection('players');
    const insertResult = await collection.insertMany(validatedPlayers);

    res.status(201).json({
      message: 'Players added successfully',
      insertedCount: insertResult.insertedCount,
      insertedIds: insertResult.insertedIds
    });
  } catch (error) {
    console.error('Error adding players:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





const listPlayers = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('players');

    // Query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const team = req.query.team;

    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (team) {
      filter.team = team;
    }

    const total = await collection.countDocuments(filter);
    const players = await collection
      .find(filter)
      .skip(skip)
      .limit(limit)
      .project({
        name: 1,
        image: 1,
        role: 1,
        team: 1
      })
      .toArray();

    res.status(200).json({
      page,
      limit,
      total,
      players: players.map(p => ({
        id: p._id,
        name: p.name,
        image: p.image,
        role: p.role,
        team: p.team
      }))
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getPlayerDescription = async (req, res) => {
  try {
    const playerId = req.params.id;

    if (!ObjectId.isValid(playerId)) {
      return res.status(400).json({ message: 'Invalid player ID' });
    }

    const db = getDB();
    const collection = db.collection('players');

    const player = await collection.findOne({ _id: new ObjectId(playerId) });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const { name, team, country, runs, image, role, salary } = player;

    res.status(200).json({
      name,
      team,
      country,
      runs,
      image,
      role,
      salary
    });
  } catch (error) {
    console.error('Error fetching player description:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { addPlayer,addPlayersMany ,listPlayers,getPlayerDescription};
