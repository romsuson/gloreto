const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').post((req, res) => {
console.log('req.body.val roomtype: ',req.body.val)

});


router.route('/User_info').post((req, res) => {
  console.log('req.body.val: ',req.body)
  User.find({ _partition: req.body.val })
      .then(exercises => res.json(exercises[0]))
      .catch(err => res.status(400).json('Error: ' + err));
  });




module.exports = router;