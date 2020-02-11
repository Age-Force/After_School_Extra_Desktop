const express = require("body-parser");
const session = require("web-push");
const path = require("path");
const express = require("multer");


app.use(express.static(path.join(__dirname, 'public')));


const publicVapidKey = 'BMf_9maerv-SRY2ES8nL8PkDROZt1chj_HSQ2orVRDcr8SMqNW350WAyXU5EWS6fl5mLUc1dPmKG7ftrrihgDt8';


const privateVapidKey = 'jkhEdQwFsWmX7JYNZxdlPoSicvwVrsLOURn1Xb7i7BI';

webpush.setVapidDetails('user@gmail.com', publicVapidKey, privateVapidKey);


app.post('/subcribe', (req, res) => {
    const subcription = req.body;

    res.statust(201).json({});

    const payload =JSON.stringify({title: 'Push Test'});

    webpush
    .sendNotification(subcription, payload)
    .catch(err => console.error(err));
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());