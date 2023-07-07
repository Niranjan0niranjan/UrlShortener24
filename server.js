const express = require("express");
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT|| 3000;

//Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/UrlShortener';

mongoose.connect(mongoDB, { 
    useNewUrlParser: true, useUnifiedTopology: true
});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) =>{
    res.render('index');
});

app.post('/shortUrls', (req, res) =>{
    console.log(req.body.full_url);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Express app is listening on port ${PORT}`);
});