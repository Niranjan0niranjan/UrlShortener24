const express = require("express");
const mongoose = require('mongoose');
const app = express();
const ShortUrl = require('./models/shortUrl')
const PORT = process.env.PORT || 3000;
const mongoDB = 'mongodb://localhost:27017/UrlShortener'; //Set up default mongoose connection


mongoose.connect(mongoDB, {
    useNewUrlParser: true, useUnifiedTopology: true
});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/shortUrls', async (req, res) => {
    var full = req.body.full_url;
    try {
        new URL(full);
        var short_url = await ShortUrl.create({ full: full });
        console.log(full);
        console.log(short_url.short);
        // res.redirect('/');
        res.render('index2', {short_url});
    } catch (_) {
        console.log('Invalid URL');
    }
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if( shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++; 
    shortUrl.save();

    
    res.redirect(shortUrl.full);
})

app.listen(PORT, () => {
    console.log(`Express app is listening on port ${PORT}`);
});