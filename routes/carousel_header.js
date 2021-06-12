const router = require('express').Router();
let Carousel_header = require('../models/carousel_header.model');


router.route('/add_carousel_header').post((req, res) => {
  const title = req.body.title;
  const subtitles = req.body.subtitles;
  const background_image = req.body.background_image;
  const _partition = req.body._partition;
  const createdAt = req.body.createdAt;

  const newHighlight = new Carousel_header({
    title,
    subtitles,
    background_image,
    _partition,
    createdAt,
    updatedAt: createdAt,
  });

  newHighlight.save()
  .then(() => res.json('Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/View_Carousel_header').post((req, res) => {

    Carousel_header.find({ _partition: req.body.val})
        .then(highlight => res.json(highlight))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    

    router.route('/Highlight_Delete').post((req,res)=>{

        console.log('req.body: ', req.body)
      
        Carousel_header.findByIdAndRemove(req.body.id)
        .then(data=>{
           
            res.send(data)
        })
        .catch(err=>{
            console.log(err)
        })
    })




module.exports = router;