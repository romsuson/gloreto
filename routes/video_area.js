const router = require('express').Router();
let Video_Area = require('../models/video_area.model');


router.route('/Add_Video_Area').post((req, res) => {
  const title = req.body.title;
  const subtitles = req.body.subtitles;
  const background_image = req.body.background_image;
  const link = req.body.link;
  const _partition = req.body._partition;
  const createdAt = req.body.createdAt;

  const newHighlight = new Video_Area({
    title,
    subtitles,
    background_image,
    link,
    _partition,
    createdAt,
    updatedAt: createdAt,
  });

  newHighlight.save()
  .then(() => res.json('Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/View_Video_Area').post((req, res) => {

    Video_Area.find({ _partition: req.body.val})
        .then(highlight => res.json(highlight[0]))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    

  
    router.route('/Update_NoBackground').post((req, res) => {
        console.log('No Background: ', req.body)
        Video_Area.findById(req.body.id)
        .then(exercise => { 
                exercise.title = req.body.title;
                 exercise.subtitles= req.body.subtitles;
                 exercise.link=req.body.link,
          exercise.save()
            .then(() => res.json('updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });


    router.route('/Update_Background').post((req, res) => {
        Video_Area.findById(req.body.id)
        .then(exercise => { 
                exercise.title = req.body.title;
                 exercise.subtitles= req.body.subtitles;
                 exercise.link=req.body.link,
                 exercise.background_image= req.body.background_image,
                
            
          exercise.save()
            .then(() => res.json('updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });
module.exports = router;