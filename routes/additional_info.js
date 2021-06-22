const router = require('express').Router();
let Additional_Info = require('../models/additional_info.model');




router.route('/View_Additional_Info').post((req, res) => {

    Additional_Info.find({ _partition: req.body.val})
        .then(vacation => res.json(vacation[0]))
        .catch(err => res.status(400).json('Error: ' + err));
    });
    



    router.route('/update').post((req, res) => {
        Additional_Info.findById(req.body.id)
        .then(exercise => {
            if(req.body.hotel_image === ""){
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
          
module.exports = router;