const router = require('express').Router();
let Task = require('../models/room_type.model');

router.route('/').post((req, res) => {
console.log('req.body.val: ',req.body)
    Task.find({ _partition: req.body.val})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/searchroom').post((req, res) => {
  console.log('req.body.val: ',req.body)
      Task.find({ temp_id: req.body.val})
      .then(exercises => res.json(exercises[0]))
      .catch(err => res.status(400).json('Error: ' + err));
  });


router.route('/search_result').post((req, res) => {
  console.log('req.body.val: ',req.body)
      Task.find({hotel_city:  { $regex: req.body.address.toLowerCase() , $options:'i' }, max_person: { $gte: req.body.guest} })
      .then((exercises) =>res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/random').post((req, res) => {

    console.log('random: ',Math.floor(Math.random() * 999))
        Task.find({temp_id: {$in: ['b894d0-783898', 'b894d0-457820', 'b894d0-129205']} })
       .then((exercises) =>{
         res.json(exercises)
        console.log('ramdom Details: ', exercises)
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });


router.route('/logins').post((req, res) => {
    console.log(req.body)
    Exercise.findOne({ name: req.body.username, hotel_id: req.body.description})
    .then(exercises => {
      if(exercises.description == req.body.description){
        res.json(exercises)
      }
      else{
        res.json(exercises)
      }
     
    })
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update_img').post((req, res) => {
    Task.findById(req.body.id)
    .then(exercise => {
      exercise.img = req.body.img;
      exercise.save()
        .then(() => res.json('updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;