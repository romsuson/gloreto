const router = require('express').Router();
let Hotel_Offer = require('../models/hotel_offer.model');


router.route('/Add_Hotel_Offer').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const _partition = req.body._partition;
  const createdAt = req.body.createdAt;
console.log('description: ', description)
  const newHighlight = new Hotel_Offer({
    title,
    description,
    image,
    _partition,
    createdAt,
    updatedAt: createdAt,
  });

  newHighlight.save()
  .then(() => res.json('Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/image1_edit').post((req, res) => {
    Hotel_Offer.findById(req.body.id)
    .then(exercise => {
      exercise.image1 = req.body.img1;
      exercise.save()
        .then(() => res.json('updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/image2_edit').post((req, res) => {
    Hotel_Offer.findById(req.body.id)
    .then(exercise => {
      exercise.image2 = req.body.img2;
      exercise.save()
        .then(() => res.json('updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/View_Hotel_Offer').post((req, res) => {

    Hotel_Offer.find({ _partition: req.body.val})
        .then(highlight => res.json(highlight))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    

    router.route('/Hotel_Offer_Delete').post((req,res)=>{

        console.log('req.body: ', req.body)
      
        Hotel_Offer.findByIdAndRemove(req.body.id)
        .then(data=>{
           
            res.send(data)
        })
        .catch(err=>{
            console.log(err)
        })
    })




module.exports = router;