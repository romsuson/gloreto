const router = require('express').Router();
let SearchTask = require('../models/search.model');

router.route('/').post((req, res) => {
console.log('req.body.val: ',req.body)
    Task.find({ _partition: req.body.val})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/view').post((req, res) => {
    console.log('/view', req.body)
    SearchTask.findOne({ _id: '60af402a0671e3a1db92d8a2' }).populate("additional_info")
    .then(exercises => {
        res.json(exercises)
     
    })
    .catch(err => res.status(400).json('Error: ' + err));
  });
  


module.exports = router;