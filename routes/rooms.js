const router = require('express').Router();
let Rooms = require('../models/rooms.model');

router.route('/Room_List').post((req, res) => {
console.log('req.body.valroom: ',req.body)
Rooms.find({ _partition: req.body.val})
    .then((exercises) => {res.json(exercises)})
    .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;