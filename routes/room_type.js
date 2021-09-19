const router = require('express').Router();
let Task = require('../models/room_type.model');

router.route('/').post((req, res) => {
console.log('req.body.val roomtype: ',req.body.val)
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
      Task.find({hotel_address:  { $regex: req.body.address.toLowerCase() , $options:'i' }, max_person: { $gte: req.body.guest}, show_website: 1})
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

/*
console.log('work here')

    Task.updateMany({_id:req.body.id}, 
      {$set: {video:"ABCD"}}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated Docs : ", docs);
      }
    });*/
    Task.findById(req.body.id)
    .then(exercise => {
      exercise.img = req.body.img;
      exercise.save()
        .then(() => res.json('updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update_video').post((req, res) => {
  
      Task.updateMany({_partition:req.body.id}, 
        {$set: {video:req.body.video}}, function (err, docs) {
        if (err){
          res.status(400).json('Error: ' + err)
        }
        else{
          res.json('updated!')
        }
      });
      /*Task.findById(req.body.id)
      .then(exercise => {
        exercise.img = req.body.img;
        exercise.save()
          .then(() => res.json('updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));*/
  });

  router.route('/update_one_img').post((req, res) => {

    console.log('work here')
    console.log('req.body.id', req.body.id)
    var objFriends = { original: req.body.img, thumbnail: req.body.img};


    
    Task.findOneAndUpdate({temp_id:req.body.id}, 
      {$push: {img: objFriends}}, function (err, docs) {
      if (err){
        res.status(400).json('Error: ', err)
      }
      else{
        res.json('updated!')
      }
    });
        
    });
    
    router.route('/update_one_delete').post((req, res) => {

      console.log('work here')
      console.log('req.body.id', req.body.id)
      var objFriends = { _id : req.body.img};
  
  
      
      Task.findOneAndUpdate({temp_id:req.body.id}, 
        {$pull: {img: objFriends}}, function (err, docs) {
        if (err){
          res.status(400).json('Error: ', err)
        }
        else{
          res.json('updated!')
        }
      });
          
      });



      router.route('/update_more_info').post((req, res) => {

        console.log('work here')
        console.log('req.body.id', req.body.id)
        
        Task.findOneAndUpdate({temp_id:req.body.id}, 
          {$set: {area: req.body.area, bed: req.body.bed, specialAmeneties: req.body.specialAmeneties, occupied: req.body.max_reserve}}, function (err, docs) {
          if (err){
            res.status(400).json('Error: ', err)
          }
          else{
            res.json('updated!')
          }
        });
            
        });







        
router.route('/update_coordinates').post((req, res) => {
  
  Task.updateMany({_partition:req.body.id}, 
    {$set: {lat: req.body.lat, lng: req.body.lng}}, function (err, docs) {
    if (err){
      res.status(400).json('Error: ', err)
    }
    else{
      res.json('updated!')
    }
  });
      
  });


  router.route('/update_status').post((req, res) => {
    Task.findOneAndUpdate({temp_id:req.body.temp_id}, 
      {$set: {show_website:req.body.show_website === 1? 0:1 }}, function (err, docs) {
      if (err){
        res.status(400).json('Error: ', err)
      }
      else{
        res.json('updated!')
      }
    });
  
    });
 
    router.route('/saved_result').post((req, res) => {
      console.log('req.body.val: ',req.body)
          Task.find({temp_id:  { $in: req.body.user_saved_rooms}, show_website: 1})
          .then((exercises) =>res.json(exercises))
          .catch(err => res.status(400).json('Error: ' + err));
      });
module.exports = router;