const router = require('express').Router();
let Checkout = require('../models/checkout.model');
let Checkin = require('../models/checkin.model');
let Booking_Reservation = require('../models/reservation.model');
let Logs = require('../models/logs.model');
let Room_checklist = require('../models/room_checklist.model');




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


router.route('/get_CheckinAll').post((req, res) => {
        Checkout.find({ _partition: req.body._partition,  check_in: { $gte: req.body.from, $lte: req.body.to}})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});
                    
router.route('/get_CheckoutAll').post((req, res) => {
        Checkout.find({ _partition: req.body._partition, check_out: { $gte: req.body.from, $lte: req.body.to}})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});
                    
                    
 router.route('/get_Reservation_Checkin_All').post((req, res) => {
        Checkout.find({ _partition: req.body._partition, checkin_stat: 'Reservation', check_in: { $gte: req.body.from, $lte: req.body.to}})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});
                    
router.route('/get_Reservation_Checkout_All').post((req, res) => {
        Checkout.find({ _partition: req.body._partition, checkin_stat: 'Reservation', check_out: { $gte: req.body.from, $lte: req.body.to}})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
 });
router.route('/get_FD_Checkin_All').post((req, res) => {
        Checkout.find({ _partition: req.body._partition, checkin_stat: 'Over The Counter', check_in: { $gte: req.body.from, $lte: req.body.to}})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});
                            
router.route('/get_FD_Checkout_All').post((req, res) => {
        Checkout.find({ _partition: req.body._partition, checkin_stat: 'Over The Counter', check_out: { $gte: req.body.from, $lte: req.body.to}})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});
                    
router.route('/get_cash_All').post((req, res) => {
        Checkout.find({ _partition: req.body._partition, payment_method: { $in: ['', 'Cash'] }, check_out: { $gte: req.body.from, $lte: req.body.to}})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
 });

router.route('/get_debit_All').post((req, res) => {
        Checkout.find({ _partition: req.body._partition, payment_method: 'Debit Card', check_out: { $gte: req.body.from, $lte: req.body.to}})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

 router.route('/get_credit_All').post((req, res) => {
        Checkout.find({ _partition: req.body._partition, payment_method: 'Credit Card', check_out: { $gte: req.body.from, $lte: req.body.to}})
            .then(exercises => res.json(exercises))
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_ewallet_All').post((req, res) => {
        Checkout.find({ _partition: req.body._partition, payment_method: 'E-Wallet', check_out: { $gte: req.body.from, $lte: req.body.to}})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_refunded_All').post((req, res) => {
        Checkin.find({ _partition: req.body._partition, status: 'Refunded', check_out: { $gte: req.body.from, $lte: req.body.to}})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/get_refunded_reservation').post((req, res) => {
        Checkin.find({ _partition: req.body._partition, status: 'Refunded', checkin_stat: 'Reservation', check_out: { $gte: req.body.from, $lte: req.body.to}})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/get_refunded_fd').post((req, res) => {
        Checkin.find({ _partition: req.body._partition, status: 'Refunded', checkin_stat: 'Over The Counter', check_out: { $gte: req.body.from, $lte: req.body.to}})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/get_cancelled_reservation').post((req, res) => {
        Booking_Reservation.find({ _partition: req.body._partition, status: 'Cancelled', in_check: { $gte: req.body.from, $lte: req.body.to}})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/get_staff_logs').post((req, res) => {
        Logs.find({ _partition: req.body._partition, date: { $gte: req.body.from, $lte: req.body.to}})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/get_housekeeping_history').post((req, res) => {
        Room_checklist.find({ _partition: req.body._partition, date: { $gte: req.body.from, $lte: req.body.to}})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;