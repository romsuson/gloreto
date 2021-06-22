const router = require('express').Router();
let Goods = require('../models/goods.model');

router.route('/get_Goods').post((req, res) => {
console.log('req.body.val: ',req.body)
Goods.find({ _partition: req.body.val})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;