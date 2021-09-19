const router = require('express').Router();
let Feedback = require('../models/feedback.model');
let Task = require('../models/room_type.model');

router.route('/add_Feedback').post((req, res) => {
    const name = req.body.name;
    const feedback = req.body.feedback;
    const address = req.body.address;
    const rate = req.body.rate;
    const _partition = req.body._partition;
    const createdAt = req.body.createdAt;
    const room_id = req.body.room_id;
    const res_code = req.body.res_code;

    if(req.body.rate === 1){
    Task.findOneAndUpdate({temp_id:room_id}, 
        {$inc: {star1: rate}}, function (err, docs) {
        if (err){
          res.status(400).json('Error: ', err)
        }
        else{
            const newVacation= new Feedback({
                name,
                feedback,
                address,
                rate,
                _partition,
                createdAt,
                updatedAt: createdAt,
                res_code,
                room_id,
              });
            
              newVacation.save()
              .then(() => res.json('Feedback added!'))
              .catch(err => res.status(400).json('Error: ' + err));
        }
      });
    
    }

    else if(req.body.rate === 2){
        Task.findOneAndUpdate({temp_id:room_id}, 
            {$inc: {star2: rate}}, function (err, docs) {
            if (err){
              res.status(400).json('Error: ', err)
            }
            else{
                const newVacation= new Feedback({
                    name,
                    feedback,
                    address,
                    rate,
                    _partition,
                    createdAt,
                    updatedAt: createdAt,
                    res_code,
                    room_id,
                  });
                
                  newVacation.save()
                  .then(() => res.json('Feedback added!'))
                  .catch(err => res.status(400).json('Error: ' + err));
            }
          });
        
        }
       else if(req.body.rate === 3){
            Task.findOneAndUpdate({temp_id:room_id}, 
                {$inc: {star3: rate}}, function (err, docs) {
                if (err){
                  res.status(400).json('Error: ', err)
                }
                else{
                    const newVacation= new Feedback({
                        name,
                        feedback,
                        address,
                        rate,
                        _partition,
                        createdAt,
                        updatedAt: createdAt,
                        res_code,
                        room_id,
                      });
                    
                      newVacation.save()
                      .then(() => res.json('Feedback added!'))
                      .catch(err => res.status(400).json('Error: ' + err));
                }
              });
            
            }
            else if(req.body.rate === 4){
                Task.findOneAndUpdate({temp_id:room_id}, 
                    {$inc: {star4: rate}}, function (err, docs) {
                    if (err){
                      res.status(400).json('Error: ', err)
                    }
                    else{
                        const newVacation= new Feedback({
                            name,
                            feedback,
                            address,
                            rate,
                            _partition,
                            createdAt,
                            updatedAt: createdAt,
                            res_code,
                            room_id,
                          });
                        
                          newVacation.save()
                          .then(() => res.json('Feedback added!'))
                          .catch(err => res.status(400).json('Error: ' + err));
                    }
                  });
                
                }
                else if (req.body.rate === 5){
                    Task.findOneAndUpdate({temp_id:room_id}, 
                        {$inc: {star5: rate}}, function (err, docs) {
                        if (err){
                          res.status(400).json('Error: ', err)
                        }
                        else{
                            const newVacation= new Feedback({
                                name,
                                feedback,
                                address,
                                rate,
                                _partition,
                                createdAt,
                                updatedAt: createdAt,
                                res_code,
                                room_id,
                              });
                            
                              newVacation.save()
                              .then(() => res.json('Feedback added!'))
                              .catch(err => res.status(400).json('Error: ' + err));
                        }
                      });
                    
                    }
  
});


router.route('/View_Feedback').post((req, res) => {

    Feedback.find({ _partition: req.body.val})
        .then(vacation => res.json(vacation))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/get_your_feedback').post((req, res) => {

        Feedback.find({ res_code: req.body.res_code})
            .then(vacation => res.json(vacation[0]))
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