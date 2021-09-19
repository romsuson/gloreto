const router = require('express').Router();
let Anemeties = require('../models/Anemeties.model');


router.route('/add_anemeties').post((req, res) => {

  const subtitle = req.body.subtitle;
  const title = req.body.title;
  const description = req.body.description;
  const img = req.body.img;
  const side = req.body.side;
  const _partition = req.body._partition;
  const createdAt = req.body.createdAt;

  const newAnemeties = new Anemeties({
    title,
    subtitle,
    img,
    side,
    description,
    _partition,
    createdAt,
    updatedAt: createdAt,
  });

  newAnemeties.save()
  .then(() => res.json('Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/View_anemeties').post((req, res) => {

    Anemeties.find({ _partition: req.body.val})
        .then(highlight => res.json(highlight))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    

    router.route('/Highlight_Delete').post((req,res)=>{

        console.log('req.body: ', req.body)
      
        Highlight_Activities.findByIdAndRemove(req.body.id)
        .then(data=>{
           
            res.send(data)
        })
        .catch(err=>{
            console.log(err)
        })
    })




module.exports = router;