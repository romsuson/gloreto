const router = require('express').Router();
let Booking_Reservation = require('../models/reservation.model');
let Voucher = require('../models/voucher.model');

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
  const guest_id = req.body.guest_id;
  const price = req.body.price;
  const hour_duration = req.body.hour_duration;
  const duration_mode = req.body.duration_mode;
  const rate_mode = req.body.rate_mode;
  const room_name = req.body.room_name;

  console.log('book_reservation: ', req.body)
  if(req.body.date_value === 0){
    console.log('date_value: ', req.body.date_value)
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
      guest_id,
      updatedAt: createdAt,
      reason: '',
      voucher_code: '',
      status: 'For Reservation',
      voucher_code: '',
     voucher_min:0,
     voucher_max: 0,
     voucher_exp: 0,
     voucher_details: '',
     voucher_mode: '',
     voucher_value: 0,
     roomprice:price,
     promo_price_hour:price,
     roomprice_hour: price,
     hour_duration,
duration_mode,
rate_mode,
room_name,
     feedback: '',
     rate: 0,
    });
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  }else{
  Voucher.find({code: req.body.code,status:'active',expiration_date: {$gte: req.body.date_value}})
  .then(vacation => {
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
      guest_id,
      updatedAt: createdAt,
      reason: '',
      voucher_code: '',
      status: 'For Reservation',
      voucher_code: vacation[0].code,
     voucher_min:vacation[0].min_stay,
     voucher_max: vacation[0].max_stay,
     voucher_exp: vacation[0].expiration_date,
     voucher_details: vacation[0].description,
     voucher_mode: vacation[0].mode,
     voucher_value: vacation[0].vouchvalue,
     roomprice:price,
     promo_price_hour:price,
     roomprice_hour: price,
     hour_duration,
     duration_mode,
     rate_mode,
     room_name,
     feedback: '',
     rate: 0,
    });
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    
  })
  .catch(err => res.status(400).json('Error: ' + err));}




});


router.route('/reserve').post((req, res) => {

    Booking_Reservation.find({ _partition: req.body.val, status: { $in: ['For Reservation', 'Confirmed'] }})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/reserve_info').post((req, res) => {

      Booking_Reservation.find({email: req.body.email, reservation_code: req.body.reservation_code})
          .then(exercises => res.json(exercises[0]))
          .catch(err => res.status(400).json('Error: ' + err));
      });
      router.route('/reserve_booking_details').post((req, res) => {
        console.log('reserve_booking_details: ',req.body.code)
        Booking_Reservation.find({reservation_code: req.body.code})
            .then(exercises => res.json(exercises[0]))
            .catch(err => res.status(400).json('Error: ' + err));
        });

      router.route('/reserve_booking').post((req, res) => {
        console.log('req.body.val: ',req.body)
        Booking_Reservation.find({guest_id: req.body.guest_id})
            .then(exercises => res.json(exercises))
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
              Booking_Reservation.find({ _partition: req.body.val})
                  .then(exercises => res.json(exercises))
                  .catch(err => res.status(400).json('Error: ' + err));
              });
              router.route('/reserve_cancelled').post((req, res) => {
                Booking_Reservation.find({ _partition: req.body.val, status: 'Cancelled' })
                    .then(exercises => res.json(exercises))
                    .catch(err => res.status(400).json('Error: ' + err));
                });
                router.route('/reserve_confirm').post((req, res) => {
                  Booking_Reservation.find({ _partition: req.body.val, status: 'Confirmed' })
                      .then(exercises => res.json(exercises))
                      .catch(err => res.status(400).json('Error: ' + err));
                  });


                  router.route('/reserve_booking_voucher').post((req, res) => {
                    console.log('req.body.val: ',req.body)
                    Booking_Reservation.find({guest_id: req.body.guest_id, voucher_exp: {$gt: 0}})
                        .then(exercises => res.json(exercises))
                        .catch(err => res.status(400).json('Error: ' + err));
                    });
                    router.route('/reserve_get_booking').post((req, res) => {
                     
                      Booking_Reservation.find({ room: req.body.room, status: { $in: ['For Reservation', 'Confirmed'] }, in_check: { $gte: req.body.in_check, $lte: req.body.out_check}})
                      .then(exercises => res.json(exercises.length))
                      .catch(err => res.status(400).json('Error: ' + err));
                  });


module.exports = router;