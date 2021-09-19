const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');

require('dotenv').config();

const app = express();
const port = process.env.PORT || '5000';

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useFindAndModify: false  }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})










paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AZeYolY1Zu_9AnJtdMlC8jYXldIILhYm5kzbIUzuXo67CFyIoKziHNL4MuHzZnqkn292ZZyeSZRS2cFs',
  'client_secret': 'EFOOpMH157gJ22y5MOqgu27ZNvcKycNXKlWEwqOl7ccbvcueebB8L5jPc8A1aMQlIOpLzsI_AxvOr9V0'
});


var amt = null;

app.get('/pay/:amt', (req, res) => {
   
    amt = req.params.amt;

    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:5000/success",
          "cancel_url": "http://localhost:5000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Red Hat",
                  "sku": "001",
                  "price": amt,
                  "currency": "PHP",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "PHP",
              "total": amt
          },
          "description": "Hat for the best team ever"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
  });

  app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    console.log("payerId",payerId,"paymentId",paymentId) 
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "PHP",
              "total": amt
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log("error",error.response);
          throw error;
      } else {
          res.sendFile(__dirname + "/success.html")
      }
  });
});

app.get('/cancel', (req, res) => res.send('Cancelled'));













const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const room_typeRouter = require('./routes/room_type');
const reservationRouter = require('./routes/reservation');
const adminRouter = require('./routes/admin');
const highlight = require('./routes/highlight');
const vacation = require('./routes/vacation');
const feedback = require('./routes/feedback');
const rooms = require('./routes/rooms');
const additional_info = require('./routes/additional_info');
const search = require('./routes/search');
const anemeties = require('./routes/anemeties');
const carousel_header = require('./routes/carousel_header');
const about_hotel = require('./routes/about_hotel');
const hotel_offer = require('./routes/hotel_offer');
const video_area = require('./routes/video_area');
const Checkin = require('./routes/checkin');
const Checkout = require('./routes/checkout');
const Goods = require('./routes/goods');
const Sales_History = require('./routes/sales_history');
const guest_account = require('./routes/guest_account');
const voucher = require('./routes/voucher');
const user = require('./routes/user');
const notification = require('./routes/notification');


app.use('/sales_history', Sales_History);
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/room_type', room_typeRouter);
app.use('/reservation', reservationRouter);
app.use('/admin', adminRouter);
app.use('/highlight', highlight);
app.use('/vacation', vacation);
app.use('/feedback', feedback);
app.use('/rooms', rooms);
app.use('/additional_info', additional_info);
app.use('/search', search);
app.use('/anemeties', anemeties);
app.use('/carousel_header', carousel_header);
app.use('/about_hotel', about_hotel);
app.use('/hotel_offer', hotel_offer);
app.use('/video_area', video_area);
app.use('/Checkin', Checkin);
app.use('/Checkout', Checkout);
app.use('/Goods', Goods);
app.use('/guest_account', guest_account);
app.use('/voucher', voucher);
app.use('/user', user);
app.use('/notifications', notification);

//development
/*app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});*/


//Production

var server = app.listen(process.env.PORT || 5000, function(){
  var port = server.address().port;
  console.log("Server is running on port " + port)
})