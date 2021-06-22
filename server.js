const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || '5000';

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

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

//development
/*app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});*/


//Production

var server = app.listen(process.env.PORT || 5000, function(){
  var port = server.address().port;
  console.log("Server is running on port " + port)
})