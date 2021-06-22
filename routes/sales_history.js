const router = require('express').Router();
let Sales_History = require('../models/sales_history.model');


router.route('/add_sales').post((req, res) => {

  const expiration = req.body.expiration;
  const _partition = req.body._partition;
  const price = req.body.price;
  const name_goods_promo = req.body.name_goods_promo;
  const number = req.body.number;
  const description = req.body.description;
  const price_room_plan = req.body.price_room_plan;
  const name_room_plan = req.body.name_room_plan;
  const number_room_plan = req.body.number_room_plan;
  const description_room_plan = req.body.description_room_plan;
  const user_id = req.body.user_id;
  const email = req.body.email;
  const createdAt = req.body.createdAt;

  const newExercise = new Sales_History({
    expiration,
    price,
    name_goods_promo,
    number,
    description,
    _partition,
    createdAt,
    price_room_plan,
    name_room_plan,
    number_room_plan,
    description_room_plan,
    user_id,
    email,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/get_all_sales').post((req, res) => {
    console.log('req.body.val: ',req.body)
    Sales_History.find({ expiration: { $gte: 0}})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
    });




    router.route('/week_past').post((req, res) => {

        Sales_History.find({ createdAt: {$gte:req.body.from,$lt:req.body.to}})
            .then(highlight => res.json(highlight))
            .catch(err => res.status(400).json('Error: ' + err));
        });
        router.route('/week_current').post((req, res) => {
    
            Sales_History.find({ createdAt: {$gte:req.body.from,$lte:req.body.to}})
              .then(highlight => res.json(highlight))
              .catch(err => res.status(400).json('Error: ' + err));
          });
    


          router.route('/month_past').post((req, res) => {

            Sales_History.find({ createdAt: {$gte:req.body.from,$lt:req.body.to}})
                .then(highlight => res.json(highlight))
                .catch(err => res.status(400).json('Error: ' + err));
            });
            router.route('/month_current').post((req, res) => {
        
                Sales_History.find({ createdAt: {$gte:req.body.from,$lte:req.body.to}})
                  .then(highlight => res.json(highlight))
                  .catch(err => res.status(400).json('Error: ' + err));
              });
    
          /*router.route('/week_all').post((req, res) => {
    
            Sales_History.find({  createdAt: {$gt: 0}, checkin_stat: 'Over The Counter'})
                .then(highlight => res.json(highlight))
                .catch(err => res.status(400).json('Error: ' + err));
            });*/



            router.route('/fquarter_past').post((req, res) => {

                Sales_History.find({ createdAt: {$gte:req.body.from,$lt:req.body.to}})
                    .then(highlight => res.json(highlight))
                    .catch(err => res.status(400).json('Error: ' + err));
                });
                router.route('/fquarter_current').post((req, res) => {
            
                    Sales_History.find({ createdAt: {$gte:req.body.from,$lte:req.body.to}})
                      .then(highlight => res.json(highlight))
                      .catch(err => res.status(400).json('Error: ' + err));
                  });

module.exports = router;