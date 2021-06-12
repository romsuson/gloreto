const router = require('express').Router();
let Vacation = require('../models/vacation.model');


router.route('/add_Vacation').post((req, res) => {

  const title = req.body.title;
  const image_url = req.body.image_url;
  const _partition = req.body._partition;
  const createdAt = req.body.createdAt;

  const newVacation= new Vacation({
    title,
    image_url,
    _partition,
    createdAt,
    updatedAt: createdAt,
  });

  newVacation.save()
  .then(() => res.json('Vacation added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/View_vacation').post((req, res) => {

    Vacation.find({ _partition: req.body.val})
        .then(vacation => res.json(vacation))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    

    router.route('/vacation_Delete').post((req,res)=>{

        console.log('req.body: ', req.body)
      
        Vacation.findByIdAndRemove(req.body.id)
        .then(data=>{
           
            res.send(data)
        })
        .catch(err=>{
            console.log(err)
        })
    })



module.exports = router;