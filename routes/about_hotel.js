const router = require('express').Router();
let About_hotel = require('../models/about_hotel.model');


router.route('/Add_About_hotel').post((req, res) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const description = req.body.description;
  const image1 = req.body.image1;
  const image2 = req.body.image2;
  const _partition = req.body._partition;
  const createdAt = req.body.createdAt;

  const newHighlight = new About_hotel({
    title,
    subtitle,
    description,
    image1,
    image2,
    _partition,
    createdAt,
    updatedAt: createdAt,
  });

  newHighlight.save()
  .then(() => res.json('Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/image1_edit').post((req, res) => {
    About_hotel.findById(req.body.id)
    .then(exercise => {
      exercise.image1 = req.body.img1;
      exercise.save()
        .then(() => res.json('updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/image2_edit').post((req, res) => {
    About_hotel.findById(req.body.id)
    .then(exercise => {
      exercise.image2 = req.body.img2;
      exercise.save()
        .then(() => res.json('updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/View_About_hotel').post((req, res) => {

    About_hotel.find({ _partition: req.body.val})
        .then(highlight => res.json(highlight))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    

    router.route('/About_hotel_Delete').post((req,res)=>{

        console.log('req.body: ', req.body)
      
        About_hotel.findByIdAndRemove(req.body.id)
        .then(data=>{
           
            res.send(data)
        })
        .catch(err=>{
            console.log(err)
        })
    })




module.exports = router;