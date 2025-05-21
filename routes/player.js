const express = require('express');
const router = express.Router();
const { addPlayer ,addPlayersMany,listPlayers,getPlayerDescription} = require('../controllers/playersController');

// Route to add a new player
router.post('/add/player', addPlayer);
router.post('/many/player', addPlayersMany);
router.get('/players', listPlayers);
router.get('/players/:id/description', getPlayerDescription);

module.exports = router;
