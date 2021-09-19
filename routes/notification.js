
const fetch = require('node-fetch');

const router = require('express').Router();


router.post('/sendToAll',(req,res)=>{
var notification ={
    'title':'Reservation For Room '+req.body.room,
    'text':'Please Accomodate ASAP'
};

var fcm_tokens=req.body.tokens;

var notification_body = {
    'notification': notification,
    'registration_ids': fcm_tokens,
    
}


    fetch('https://fcm.googleapis.com/fcm/send',{
        'method': 'POST',
        'headers':{
            'Authorization': 'key='+'AAAApH6Y_xo:APA91bFYxPujGSv2Ov1v8lDD9Kfn8p8mfdLwO8P5wn455huRgqUgy6EDueaI6uk-6lfOAGUc2NO1Z-ZQ0bCKeaMxo7DzyknUEyljz8ME1ZKV-1abjq5fgMjsCfIb4BL6Cqe9gVg7_bze',
            'Content-Type': 'application/json'
        },
        'body':JSON.stringify(notification_body)
    }).then(()=>{
        res.status(200).send('sucess');
        console.log('notif success: ',notification_body)
    }).catch((err)=>{
        res.status(200).send('failed');
        console.log('notif err: ',err)
    })


})


router.post('/sendToRider',(req,res)=>{
    var notification ={
        'title':req.body.title,
        'text':req.body.body,
    };
    
    var fcm_tokens=req.body.tokens;
    
    var notification_body = {
        'notification': notification,
        'registration_ids': fcm_tokens,
        
    }
    
    
        fetch('https://fcm.googleapis.com/fcm/send',{
            'method': 'POST',
            'headers':{
                'Authorization': 'key='+req.body.key,
                'Content-Type': 'application/json'
            },
            'body':JSON.stringify(notification_body)
        }).then(()=>{
            res.status(200).send('sucess');
            console.log('notif success: ',notification_body)
        }).catch((err)=>{
            res.status(200).send('failed');
            console.log('notif err: ',err)
        })
    
    
    })
    router.post('/sendToAdmin',(req,res)=>{
        var notification ={
            'title':req.body.title,
            'text':req.body.body,
        };
        
        var fcm_tokens=req.body.tokens;
        
        var notification_body = {
            'notification': notification,
            'registration_ids': fcm_tokens,
            
        }
        
        
            fetch('https://fcm.googleapis.com/fcm/send',{
                'method': 'POST',
                'headers':{
                    'Authorization': 'key='+req.body.key,
                    'Content-Type': 'application/json'
                },
                'body':JSON.stringify(notification_body)
            }).then(()=>{
                res.status(200).send('sucess');
                console.log('notif success: ',notification_body)
            }).catch((err)=>{
                res.status(200).send('failed');
                console.log('notif err: ',err)
            })
        })

        router.post('/sendToStore',(req,res)=>{
            var notification ={
                'title':req.body.title,
                'text':req.body.body,
            };
            
            var fcm_tokens=req.body.tokens;
            
            var notification_body = {
                'notification': notification,
                'registration_ids': fcm_tokens,
                
            }
            
            
                fetch('https://fcm.googleapis.com/fcm/send',{
                    'method': 'POST',
                    'headers':{
                        'Authorization': 'key='+req.body.key,
                        'Content-Type': 'application/json'
                    },
                    'body':JSON.stringify(notification_body)
                }).then(()=>{
                    res.status(200).send('sucess');
                    console.log('notif success: ',notification_body)
                }).catch((err)=>{
                    res.status(200).send('failed');
                    console.log('notif err: ',err)
                })
            
            })
module.exports = router