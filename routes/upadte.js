const express=require('express');
const { updatePlayer ,deletePlayer} = require('../controllers/playerUpadate');
const router=express.Router();
router.patch('/players/:id', updatePlayer);
router.delete('/players/:id', deletePlayer);

module.exports=router;
