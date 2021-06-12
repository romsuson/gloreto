const router = require('express').Router();
let Booking_Reservation = require('../models/reservation.model');


router.route('/book_reservation').post((req, res) => {

  const name = req.body.name;
  const email = req.body.email;
  const phone_no = req.body.phone_no;
  const address = req.body.address;
  const nationality = req.body.nationality;
  const mode = req.body.mode;
  const reservation_code = req.body.reservation_code;
  const in_check = req.body.in_check;
  const out_check = req.body.out_check;
  const room = req.body.room;
  const guest = req.body.guest;
  const _partition = req.body._partition;
  const createdAt = req.body.createdAt;

  const newExercise = new Booking_Reservation({
    name,
    email,
    phone_no,
    address,
    nationality,
    mode,
    reservation_code,
    in_check,
    out_check,
    room,
    guest,
    _partition,
    createdAt,
    updatedAt: createdAt,
    reason: '',
    status: 'For Reservation',
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/reserve').post((req, res) => {
    console.log('req.body.val: ',req.body)
    Booking_Reservation.find({ _partition: req.body.val, status: 'For Reservation'})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/reserve_info').post((req, res) => {
      console.log('req.body.val: ',req.body)
      Booking_Reservation.find({email: req.body.email, reservation_code: req.body.reservation_code})
          .then(exercises => res.json(exercises[0]))
          .catch(err => res.status(400).json('Error: ' + err));
      });




    router.route('/approved').post((req, res) => {
      Booking_Reservation.findById(req.body.id)
      .then(exercise => {
        exercise.status = 'Confirmed';
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
    
  router.route('/cancel').post((req, res) => {
    Booking_Reservation.findById(req.body.id)
    .then(exercise => {
      exercise.status = 'Cancelled';
      exercise.reason = req.body.reason;
      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;