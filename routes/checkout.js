const router = require('express').Router();
let Checkout = require('../models/checkout.model');

router.route('/get_Checkout').post((req, res) => {
console.log('req.body.val: ',req.body)
Checkout.find({ _partition: req.body.val})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/all_checkin_past').post((req, res) => {

    Checkout.find({ check_out: {$gte:req.body.from,$lt:req.body.to}})
        .then(highlight => res.json(highlight))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    router.route('/all_checkin_current').post((req, res) => {

        Checkout.find({ check_out: {$gte:req.body.from,$lte:req.body.to}})
          .then(highlight => res.json(highlight))
          .catch(err => res.status(400).json('Error: ' + err));
      });


      router.route('/all_checkin_all').post((req, res) => {

        Checkout.find({  check_out: {$gt: 0}})
            .then(highlight => res.json(highlight))
            .catch(err => res.status(400).json('Error: ' + err));
        });





        router.route('/otc_past').post((req, res) => {

            Checkout.find({ check_out: {$gte:req.body.from,$lt:req.body.to}, checkin_stat: 'Over The Counter'})
                .then(highlight => res.json(highlight))
                .catch(err => res.status(400).json('Error: ' + err));
            });
            router.route('/otc_current').post((req, res) => {
        
                Checkout.find({ check_out: {$gte:req.body.from,$lte:req.body.to}, checkin_stat: 'Over The Counter'})
                  .then(highlight => res.json(highlight))
                  .catch(err => res.status(400).json('Error: ' + err));
              });
        
        
              router.route('/otc_all').post((req, res) => {
        
                Checkout.find({  check_out: {$gt: 0}, checkin_stat: 'Over The Counter'})
                    .then(highlight => res.json(highlight))
                    .catch(err => res.status(400).json('Error: ' + err));
                });
module.exports = router;