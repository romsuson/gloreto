const router = require('express').Router();
let Feedback = require('../models/feedback.model');


router.route('/add_Feedback').post((req, res) => {

  

  const name = req.body.name;
  const feedback = req.body.feedback;
  const address = req.body.address;
  const rate = req.body.rate;
  const _partition = req.body._partition;
  const createdAt = req.body.createdAt;

  const newVacation= new Feedback({
    name,
    feedback,
    address,
    rate,
    _partition,
    createdAt,
    updatedAt: createdAt,
  });

  newVacation.save()
  .then(() => res.json('Feedback added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/View_Feedback').post((req, res) => {

    Feedback.find({ _partition: req.body.val})
        .then(vacation => res.json(vacation))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    

    router.route('/delete_Feedback').post((req,res)=>{

        console.log('req.body: ', req.body)
      
        Feedback.findByIdAndRemove(req.body.id)
        .then(data=>{
           
            res.send(data)
        })
        .catch(err=>{
            console.log(err)
        })
    })



module.exports = router;