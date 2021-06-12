const router = require('express').Router();
let Admin = require('../models/admin.model');


router.route('/logins').post( async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    if(!username || !password){
        return res.status(422).json('Must Provide Email and Password')
    }
    const user =  await Admin.findOne({ name: username });
    //console.log('user', user)
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
  /*  Admin.findOne({ name: email, hotel_id: password})
    .then(exercises => {
        res.json(exercises), console.log('Match',exercises)
     
    })
    .catch(err => res.status(400).json('Error: ' + err));***/
  });
  


module.exports = router;