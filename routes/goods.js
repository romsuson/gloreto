const router = require('express').Router();
let Goods = require('../models/goods.model');
let Category = require('../models/category.model');
let Orders = require('../models/orders.model');

router.route('/get_Goods').post((req, res) => {
console.log('req.body.val: ',req.body)
Goods.find({ _partition: req.body.val, status: "Available"})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add_category').post((req, res) => {
   
  const name = req.body.name;
  const catid = req.body.catid;
  const _partition = req.body._partition;
 

  const newCategory= new Category({
    name,
    catid,
    _partition,
    status: 'Available'
  });

  newCategory.save()
  .then(() => res.json('added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_Category').post((req, res) => {
    console.log('req.body.val: ',req.body)
    Category.find({ _partition: req.body.val, status: 'Available'})
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    router.route('/delete_cat').post((req, res) => {

            Category.findById(req.body.id)
            .then(exercise => {
              exercise.status = 'Deleted';
              exercise.save()
                .then(() => res.json('updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        });
        


        router.route('/add_goods').post((req, res) => {
   
            const name = req.body.name;
            const price = req.body.price;
            const _partition = req.body._partition;
            const quantity = req.body.quantity;
            const product = req.body.name;
            const itemid = req.body.itemid;
            const cat = req.body.cat;
if(req.body.length>=req.body.max_Goods){
  res.status(400).json('Error: ' + err)
}else{
  const newGoods= new Goods({
              name,
              price,
              quantity,
              product,
              itemid,
              cat,
              _partition,
              status: 'Available'
            });
          
            newGoods.save()
            .then(() => res.json('added!'))
            .catch(err => res.status(400).json('Error: ' + err));}
          
            
          });



          router.route('/update_goods').post((req, res) => {
            const name = req.body.name;
            const price = req.body.price;
            const quantity = req.body.quantity;
            const product = req.body.name;
            const itemid = req.body.itemid;
            const cat = req.body.cat;
            Goods.findById(req.body.id)
            .then(exercise => {
              exercise.name = name;
              exercise.price = price;
              exercise.quantity = quantity;
              exercise.product = product;
              exercise.cat = cat;
              exercise.save()
                .then(() => res.json('updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        });
        
        router.route('/delete_goods').post((req, res) => {

            Goods.findById(req.body.id)
                .then(exercise => {
                  exercise.status = 'Deleted';
                  exercise.save()
                    .then(() => res.json('updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error: ' + err));
            });


            router.route('/get_Goods_report').post((req, res) => {
                console.log('req.body.val: ',req.body)
                Orders.find({ _partition: req.body.val, updated_at: { $gte: req.body.from, $lte: req.body.to}})
                    .then(exercises => res.json(exercises))
                    .catch(err => res.status(400).json('Error: ' + err));
                });



module.exports = router;