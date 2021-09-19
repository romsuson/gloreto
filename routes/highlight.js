const router = require('express').Router();
let Highlight_Activities = require('../models/Highlight.model');


router.route('/highlight_activities').post((req, res) => {

  const title = req.body.title;
  const description = req.body.description;
  const _partition = req.body._partition;
  const createdAt = req.body.createdAt;

  const newHighlight = new Highlight_Activities({
    title,
    description,
    _partition,
    createdAt,
    updatedAt: createdAt,
  });

  newHighlight.save()
  .then(() => res.json('Highlight Activity added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/View_Highlight').post((req, res) => {

    Highlight_Activities.find({ _partition: req.body.val})
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