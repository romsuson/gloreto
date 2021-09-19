const router = require('express').Router();
const bcrypt = require("bcryptjs");
let Guest_Account = require('../models/guest_account.model');


router.route('/signup_guest_account').post((req, res) => {

  const signup_username = req.body.signup_username;
  
  console.log('signup_username: ', signup_username)
  const password = req.body.signup_password;
  const createdAt = req.body.createdAt;
  const temp_id = req.body.temp_id;



// Check for existing user
Guest_Account.findOne({ email: {$regex: signup_username.toLowerCase(), $options:'i'} }).then((user) => {
    if (user) return res.json("User already exists");
    const newGuest_Account = new Guest_Account({
        last_name: '',
        first_name: '',
        middle_name: '',
        suffix: '',
        valid_id: '',
        email: signup_username,
        password: password,
        phone_no: '',
        address: '',
        nationality: '',
        language: '',
        currency: '',
        booking_count: 0,
        status: 'active',
        temp_id: temp_id,
        createdAt: createdAt,
        updatedAt: createdAt,
      });


 //Password hashing
 bcrypt.genSalt(12, (err, salt) =>
 bcrypt.hash(newGuest_Account.password, salt, (err, hash) => {
   if (err) throw err;

   newGuest_Account.password = hash;
   // Save user
   newGuest_Account
     .save()
     .then(
       res.json("Successfully Registered")
     )
     .catch((err) => res.json(err));
 })
);

  });

 
});


router.route('/login_guest_account').post((req, res) => {
    const username = req.body.username;
  
    console.log('username: ', username)
    const password = req.body.password;

    Guest_Account.findOne({ email: username, status: 'active' }).then((user) => {
        if (!user) return res.json("Incorrect Email or Password");
  
        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) return res.json("Incorrect Email or Password");
          const sessUser = { id: user._id, name: user.name, email: user.emaile, temp_id: user.temp_id, saved_rooms: user.saved_rooms };
          res.json(sessUser); // sends cookie with sessionID automatically in response
        });
      });
    });
    

    router.route('/info_guest_account').post((req, res) => {
        const username = req.body.val;
      
        console.log('username: ', username)
    
        Guest_Account.findOne({ temp_id: username }).then((user) => {
            res.json(user); 
          }).catch(err => res.status(400).json('Error: ' + err));
        });

        router.route('/update_guest_account').post((req, res) => {

            const username = req.body.temp_id;
            Guest_Account.findOne({ temp_id: username })
            .then(exercise => {
              exercise.last_name = req.body.last_name;
              exercise.first_name = req.body.first_name;
              exercise.middle_name = req.body.middle_name;
              exercise.suffix = req.body.suffix;
              exercise.phone_no = req.body.phone_no;
              exercise.address = req.body.address;
              exercise.nationality = req.body.nationality;
              exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        });


        router.route('/update_password_guest_account').post((req, res) => {
            const cpassword = req.body.cpassword;
            const username = req.body.temp_id;
            Guest_Account.findOne({ temp_id: username })
            .then(exercise => {


                bcrypt.genSalt(12, (err, salt) =>
                bcrypt.hash(cpassword, salt, (err, hash) => {
                  if (err) throw err;
               
              exercise.password = hash;
              exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
       
                })
               )

            }).catch(err => res.status(400).json('Error: ' + err));
        });



        router.route('/save_room').post((req, res) => {
          var conditions = {
            temp_id: req.body.email,
        };
        
        var update = {
            $push: {saved_rooms: req.body.saved_rooms}
        }


console.log('save_room',req.body)
Guest_Account.findOneAndUpdate(conditions, update, function (err, docs) {
if (err){
  res.json('error')
}
else{
  res.json('success')
}
});
        });



        router.route('/remove_save_room').post((req, res) => {
          var conditions = {
            temp_id: req.body.email,
        };
        
        var update = {
            $pull: {saved_rooms: req.body.saved_rooms}
        }

        Guest_Account.findOneAndUpdate(conditions, update, function (err, docs) {
          if (err){
            res.json('error')
          }
          else{
            res.json('success')
          }
          });
        });

module.exports = router;