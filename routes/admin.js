const router = require('express').Router();
let Admin = require('../models/admin.model');


router.route('/logins').post( async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(422).json('Must Provide Email and Password')
    }
    const user =  await Admin.findOne({ name: username });
    if(!user){
        return res.status(422).json('Invalid Password or Email')
       }
       try{
            if(user.hotel_id == password && user.userType =="Admin"){
            res.json(user)}
            else{
            return res.status(422).json('Invalid Password or Email')}
        }
       catch(err){
         return res.status(422).json('Invalid Password or Email')
       }

  });
  



router.route('/approved_account').post((req, res) => {
  Admin.findOneAndUpdate({_partition: req.body.id}, {status: 'Confirmed', expiration: req.body.expiration,created_at: req.body.createdAt, max_Goods:  req.body.max_Goods , rooms:req.body.rooms }, {useFindAndModify: false})
  .then(res=> res.json('updated!'))
      .catch(err => res.json(err));
  
});

router.route('/extend_account').post((req, res) => {
  Admin.findOneAndUpdate({_partition: req.body.id}, { status: 'Confirmed', expiration: req.body.expiration, max_Goods:  req.body.max_Goods , rooms:req.body.rooms }, {useFindAndModify: false})
  .then(res=> res.json('updated!'))
      .catch(err => res.json(err));
  
});

router.route('/blocked_account_ext').post((req, res) => {
  Admin.findOneAndUpdate({_partition: req.body.id}, {status: 'Blocked', created_at: req.body.createdAt}, {useFindAndModify: false})
  .then(res=> res.json('updated!'))
      .catch(err => res.json(err));
  
});


router.route('/pass_account_ext').post((req, res) => {
  Admin.findOneAndUpdate({_partition: req.body.id}, {status: 'Pass', created_at: req.body.createdAt}, {useFindAndModify: false})
  .then(res=> res.json('updated!'))
      .catch(err => res.json(err));
  
});

router.route('/blocked_account').post((req, res) => {
  Admin.findOneAndUpdate({_partition: req.body.id}, {status: 'Blocked',created_at: req.body.createdAt}, {useFindAndModify: false})
  .then(res=> res.json('updated!'))
      .catch(err => res.json(err));
  
});


router.route('/pass_account').post((req, res) => {
  Admin.findOneAndUpdate({_partition: req.body.id}, {status: 'Pass',created_at: req.body.createdAt}, {useFindAndModify: false})
  .then(res=> res.json('updated!'))
      .catch(err => res.json(err));
  
});

  router.route('/hotels_past').post((req, res) => {

    Admin.find({ created_at: {$gte:req.body.from,$lt:req.body.to},expiration: { $ne: null }, userType: 'Admin'})
        .then(highlight => res.json(highlight))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    router.route('/hotels_current').post((req, res) => {

      Admin.find({ created_at: {$gte:req.body.from,$lte:req.body.to},expiration: { $ne: null }, userType: 'Admin'})
          .then(highlight => res.json(highlight))
          .catch(err => res.status(400).json('Error: ' + err));
      });


      router.route('/hotels_current_count').post((req, res) => {

        Admin.find({ expiration: { $ne: null } , userType: 'Admin'})
            .then(highlight => res.json(highlight))
            .catch(err => res.status(400).json('Error: ' + err));
        });


        router.route('/approval').post((req, res) => {
          Admin.find({ status: 'Pending', userType: 'Admin', id_room_plan: {$ne: null}})
              .then(highlight => res.json(highlight))
              .catch(err => res.status(400).json('Error: ' + err));
          });
          router.route('/expired').post((req, res) => {
            Admin.find({ expiration: {$lte: req.body.from}, userType: 'Admin', status: 'Confirmed'})
                .then(highlight => res.json(highlight))
                .catch(err => res.status(400).json('Error: ' + err));
            });
          router.route('/blocked_get').post((req, res) => {
            Admin.find({ status: 'Blocked'})
                .then(highlight => res.json(highlight))
                .catch(err => res.status(400).json('Error: ' + err));
            });
            router.route('/passed').post((req, res) => {
              Admin.find({ status: 'Pass'})
                  .then(highlight => res.json(highlight))
                  .catch(err => res.status(400).json('Error: ' + err));
              });
          router.route('/expired_in_a_month').post((req, res) => {
            Admin.find({ expiration: {$gte:req.body.from, $lte:req.body.to} , userType: 'Admin', status: 'Confirmed'})
                .then(highlight => res.json(highlight))
                .catch(err => res.status(400).json('Error: ' + err));
            });
  -
            router.route('/week_exp').post((req, res) => {
              Admin.find({ expiration: { $gte:req.body.from, $lte:req.body.to }, userType: 'Admin', status: 'Confirmed'})
                  .then(highlight => res.json(highlight))
                  .catch(err => res.status(400).json('Error: ' + err));
              });
              router.route('/hotel_infos').post((req, res) => {
            
                Admin.findOne({_partition:req.body.id})
                    .then(highlight => res.json(highlight))
                    .catch(err => res.status(400).json('Error: ' + err));
                });





                router.route('/expired_past').post((req, res) => {

                  Admin.find({ expiration: {$gte:req.body.from,$lt:req.body.to},expiration: { $ne: null }, userType: 'Admin'})
                      .then(highlight => res.json(highlight))
                      .catch(err => res.status(400).json('Error: ' + err));
                  });
                  router.route('/expired_current').post((req, res) => {
              
                    Admin.find({ expiration: {$gte:req.body.from,$lte:req.body.to},expiration: { $ne: null }, userType: 'Admin'})
                        .then(highlight => res.json(highlight))
                        .catch(err => res.status(400).json('Error: ' + err));
                    });
              
              
                    router.route('/expired_all').post((req, res) => {
              
                      Admin.find({ expiration: { $lte: req.body.todayis } , userType: 'Admin'})
                          .then(highlight => res.json(highlight))
                          .catch(err => res.status(400).json('Error: ' + err));
                      });
              




                      router.route('/blocked_past').post((req, res) => {

                        Admin.find({ created_at: {$gte:req.body.from,$lt:req.body.to}, status: 'Blocked', userType: 'Admin'})
                            .then(highlight => res.json(highlight))
                            .catch(err => res.status(400).json('Error: ' + err));
                        });
                        router.route('/blocked_current').post((req, res) => {
                    
                          Admin.find({ created_at: {$gte:req.body.from,$lte:req.body.to}, status: 'Blocked', userType: 'Admin'})
                              .then(highlight => res.json(highlight))
                              .catch(err => res.status(400).json('Error: ' + err));
                          });
                    
                    
                          router.route('/blocked_all').post((req, res) => {
                    
                            Admin.find({  userType: 'Admin', status: 'Blocked'})
                                .then(highlight => res.json(highlight))
                                .catch(err => res.status(400).json('Error: ' + err));
                            });
                    





                            router.route('/passed_past').post((req, res) => {

                              Admin.find({ created_at: {$gte:req.body.from,$lt:req.body.to}, status: 'Pass', userType: 'Admin'})
                                  .then(highlight => res.json(highlight))
                                  .catch(err => res.status(400).json('Error: ' + err));
                              });
                              router.route('/passed_current').post((req, res) => {
                          
                                Admin.find({ created_at: {$gte:req.body.from,$lte:req.body.to}, status: 'Pass', userType: 'Admin'})
                                    .then(highlight => res.json(highlight))
                                    .catch(err => res.status(400).json('Error: ' + err));
                                });
                          
                          
                                router.route('/passed_all').post((req, res) => {
                          
                                  Admin.find({  userType: 'Admin', status: 'Pass'})
                                      .then(highlight => res.json(highlight))
                                      .catch(err => res.status(400).json('Error: ' + err));
                                  });
                          




module.exports = router;