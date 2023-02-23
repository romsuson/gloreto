const router = require('express').Router();
let Additional_Info = require('../models/additional_info.model');
let User = require('../models/user.model');



router.route('/View_Additional_Info').post((req, res) => {

    Additional_Info.find({ _partition: req.body.val})
        .then(vacation => res.json(vacation[0]))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    



    router.route('/update').post((req, res) => {
        Additional_Info.findById(req.body.id)
        .then(exercise => {
            if(req.body.hotel_image === ""){
              exercise.tags= req.body.facilities,
              exercise.tagsLandmarks= req.body.tagsLandmarks,
              exercise.tagsPolicies= req.body.tagsPolicies,
                exercise.hotel_name = req.body.hotel_name;
                 exercise.hotel_info= req.body.hotel_info;
                 exercise.map_address=req.body.map_address,
                 exercise.email= req.body.email,
                 exercise.mobile=req.body.mobile,
                 exercise.tel_no=req.body.tel_no,
                 exercise.website=req.body.website,
                 exercise.address=req.body.address,
                 exercise.hotel_city=req.body.hotel_city
            }else{
              exercise.tags= req.body.facilities,
              exercise.tagsLandmarks= req.body.tagsLandmarks,
              exercise.tagsPolicies= req.body.tagsPolicies,
                exercise.hotel_name = req.body.hotel_name;
                exercise.hotel_image= req.body.hotel_image;
                 exercise.hotel_info= req.body.hotel_info;
                 exercise.map_address=req.body.map_address,
                 exercise.email= req.body.email,
                 exercise.mobile=req.body.mobile,
                 exercise.tel_no=req.body.tel_no,
                 exercise.website=req.body.website,
                 exercise.address=req.body.address,
                 exercise.hotel_city=req.body.hotel_city
            }
        
          exercise.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/updateTemplate9').post((req, res) => {
      Additional_Info.findById(req.body.id)
      .then(exercise => {
              exercise.header_text = req.body.header_text;
               exercise.header_subtext= req.body.header_subtext;
          
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

    router.route('/update_header').post((req, res) => {
        Additional_Info.findById(req.body.id)
        .then(exercise => {
            if(req.body.header_image === ""){
                exercise.header_text = req.body.header_text;
                 exercise.header_subtext= req.body.header_subtext;
            }else{
                exercise.header_subtext = req.body.header_subtext;
                exercise.header_text= req.body.header_text;
                 exercise.header_image= req.body.header_image;
            }
        
          exercise.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });

        router.route('/add__Additional_Info').post((req, res) => {

          
            const newAnemeties = new Additional_Info({
                header_image: "",
                header_text: "",
                header_subtext: "",
                hotel_image: "",
                hotel_name: "",
                hotel_info: "",
                _partition: req.body.val,
                email: "",
                mobile: "",
                tel_no: "",
                website: "",
                address: "",
                hotel_city: "",
                createdAt: req.body.date
 
            });
          
            newAnemeties.save()
            .then(() => res.json('Added!'))
            .catch(err => res.status(400).json('Error: ' + err));
          });
          


          router.route('/web_past').post((req, res) => {

            Additional_Info.find({ createdAt: {$gte:req.body.from,$lt:req.body.to}})
                .then(highlight => res.json(highlight))
                .catch(err => res.status(400).json('Error: ' + err));
            });
            router.route('/web_current').post((req, res) => {
          
                Additional_Info.find({ createdAt: {$gte:req.body.from,$lte:req.body.to}})
                  .then(highlight => res.json(highlight))
                  .catch(err => res.status(400).json('Error: ' + err));
              });
          
          
              router.route('/web_all').post((req, res) => {
          
                Additional_Info.find({createdAt: { $ne: null }})
                    .then(highlight => res.json(highlight))
                    .catch(err => res.status(400).json('Error: ' + err));
                });
          

                
router.route('/update_tags').post((req, res) => {


        Additional_Info.findById(req.body.id)
        .then(exercise => {
          exercise.tagsLandmarks = req.body.tagsLandmarks;
          exercise.tags = req.body.tags;
          exercise.tagsPolicies = req.body.tagsPolicies;
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
      
    });
    router.route('/update_coordinates').post((req, res) => {

        
        Additional_Info.findOneAndUpdate({_partition:req.body.id}, 
          {$set: {lat: req.body.lat, lng: req.body.lng}}, function (err, docs) {
          if (err){
            res.status(400).json('Error: ', err)
          }
          else{
            res.json('updated!')
          }
        });
            
        });



        router.route('/idvalidations').post((req, res) => {


            Additional_Info.findOne({_partition: req.body.id})
            .then(exercise => {
              exercise.idvalidations =  exercise.idvalidations === 'active'? 'inactive':'active';
            exercise.save()
              .then(() => res.json('Exercise updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));
          
        });




        router.route('/Get_All_Tokens').post((req, res) => {
            User.find({ 'memberOf.partition': 'project=605bfe355d11edd476b894d0'}, 'canWritePartitions')
            .then(highlight => res.json(highlight))
            .catch(err => res.status(400).json('Error: ' + err));
        });

        router.route('/GloretoHotels').post((req, res) => {
          Additional_Info.find({ showOnMainHotel: '1'})
              .then((exercises) => {res.json(exercises)})
              .catch(err => res.status(400).json('Error: ' + err));
          });
module.exports = router;