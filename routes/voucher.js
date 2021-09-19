const router = require('express').Router();
let Voucher = require('../models/voucher.model');


router.route('/add_Voucher').post((req, res) => {

  const code = req.body.code;
  const date = req.body.date;
  const expiration_date = req.body.expiration_date;
  const min_stay = req.body.min_stay;
  const max_stay = req.body.max_stay;
  const description = req.body.description;
  const _partition = req.body._partition;
  const createdAt = req.body.createdAt;
  const vouchvalue = req.body.vouchvalue;
  const mode = req.body.mode;

  const newVacation= new Voucher({
    mode,
    vouchvalue,
    code,
    date,
    expiration_date,
    min_stay,
    max_stay,
    description,
    _partition,
    createdAt:date,
    updatedAt: date,
    status: 'active'
  });

  newVacation.save()
  .then(() => res.json('Voucher added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/View_Voucher').post((req, res) => {

    Voucher.find({ _partition: req.body.val})
        .then(vacation => res.json(vacation))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    

    router.route('/voucher_inactive').post((req,res)=>{

        console.log('req.body: ', req.body)

        Voucher.findById(req.body.id)
        .then(exercise => {
          exercise.status = req.body.status === 'active'?'inactive':'active';
          exercise.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })


    router.route('/edit_Voucher').post((req,res)=>{

        console.log('req.body: ', req.body)

        Voucher.findById(req.body.id)
        .then(exercise => {
            exercise.mode = req.body.mode,
            exercise.vouchvalue = req.body.vouchvalue,
            exercise.expiration_date = req.body.expiration_date,
            exercise.min_stay = req.body.min_stay,
            exercise.max_stay = req.body.max_stay,
            exercise.description = req.body.description,
          exercise.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

    })




    router.route('/check_voucher').post((req,res)=>{

        console.log('req.body: ', req.body)

        Voucher.find({code: req.body.code})
        .then(vacation => res.json(vacation))
        .catch(err => res.status(400).json('Error: ' + err));
    })

    router.route('/hotel_voucher').post((req,res)=>{

        Voucher.find({_partition: req.body.val,status:'active',expiration_date: {$gte: req.body.date_value}})
        .then(vacation => res.json(vacation))
        .catch(err => res.status(400).json('Error: ' + err));
    })

    router.route('/check_voucher_user').post((req,res)=>{

        console.log('req.body: ', req.body)

        Voucher.find({code: req.body.code,status:'active',expiration_date: {$gte: req.body.date_value},_partition: req.body.val })
        .then(vacation => res.json(vacation))
        .catch(err => res.status(400).json('Error: ' + err));
    })
module.exports = router;