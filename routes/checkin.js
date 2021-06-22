const router = require('express').Router();
let Checkin = require('../models/checkin.model');

router.route('/get_Checkin').post((req, res) => {
console.log('req.body.val: ',req.body)
Checkin.find({ _partition: req.body.val})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});







module.exports = router;