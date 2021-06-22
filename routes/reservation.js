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


router.route('/reserve_past').post((req, res) => {

  Booking_Reservation.find({ createdAt: {$gte:req.body.from,$lt:req.body.to},status: { $ne: 'Cancelled' }})
      .then(highlight => res.json(highlight))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/reserve_current').post((req, res) => {

    Booking_Reservation.find({ createdAt: {$gte:req.body.from,$lte:req.body.to},status: { $ne: 'Cancelled' }})
        .then(highlight => res.json(highlight))
        .catch(err => res.status(400).json('Error: ' + err));
    });


    router.route('/cancelled_reserve').post((req, res) => {

      Booking_Reservation.find({ status: 'Cancelled'})
          .then(highlight => res.json(highlight))
          .catch(err => res.status(400).json('Error: ' + err));
      });

      router.route('/all_reserve').post((req, res) => {

        Booking_Reservation.find({ status: { $ne: 'Cancelled' }})
            .then(highlight => res.json(highlight))
            .catch(err => res.status(400).json('Error: ' + err));
        });
        router.route('/reserve_past_cancelled').post((req, res) => {

          Booking_Reservation.find({ createdAt: {$gte:req.body.from,$lt:req.body.to},status: 'Cancelled' })
              .then(highlight => res.json(highlight))
              .catch(err => res.status(400).json('Error: ' + err));
          });
          router.route('/reserve_current_cancelled').post((req, res) => {
        
            Booking_Reservation.find({ createdAt: {$gte:req.body.from,$lte:req.body.to},status: 'Cancelled' })
                .then(highlight => res.json(highlight))
                .catch(err => res.status(400).json('Error: ' + err));
            });

            router.route('/reserve_all').post((req, res) => {
              console.log('req.body.val: ',req.body)
              Booking_Reservation.find({ _partition: req.body.val})
                  .then(exercises => res.json(exercises))
                  .catch(err => res.status(400).json('Error: ' + err));
              });
              router.route('/reserve_cancelled').post((req, res) => {
                console.log('req.body.val: ',req.body)
                Booking_Reservation.find({ _partition: req.body.val, status: 'Cancelled' })
                    .then(exercises => res.json(exercises))
                    .catch(err => res.status(400).json('Error: ' + err));
                });
                router.route('/reserve_confirm').post((req, res) => {
                  console.log('req.body.val: ',req.body)
                  Booking_Reservation.find({ _partition: req.body.val, status: 'Confirmed' })
                      .then(exercises => res.json(exercises))
                      .catch(err => res.status(400).json('Error: ' + err));
                  });
module.exports = router;