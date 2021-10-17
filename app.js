const express = require('express')
const adhan = require('adhan')
const moment = require('moment-timezone')
const conf = require('./prayerConfiguration')

const app = express()
const port = 3000

const timezone = "Asia/Jakarta"

app.get('/api/adhan', (req, res) => {
   const lat = req.query.lat;
   const long = req.query.long;

   if (! req.params || !lat || !long) {
      return res
          .status(400)
          .send({
         "status": "error",
         "message": "Invalid coordinate parameter"
      });
   }

   const coordinate = new adhan.Coordinates(lat, long);
   const date = new Date();

   const prayerTimes = new adhan.PrayerTimes(
       coordinate,
       date,
       conf.getPrayerConfiguration()
   );

   return res
       .status(200)
       .send(
       {
          "summary": {
             "location": {
                "latitude": lat,
                "longitude": long
             },
             "date": moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD'),
             "prayerTime": {
                "fajr": moment(prayerTimes.fajr).tz(timezone).format('HH:mm'),
                "sunrise": moment(prayerTimes.sunrise).tz(timezone).format('HH:mm'),
                "dzuhur": moment(prayerTimes.dhuhr).tz(timezone).format('HH:mm'),
                "ashar": moment(prayerTimes.asr).tz(timezone).format('HH:mm'),
                "maghrib": moment(prayerTimes.maghrib).tz(timezone).format('HH:mm'),
                "isya": moment(prayerTimes.isha).tz(timezone).format('HH:mm')
             }
          },
          "detail": prayerTimes,
       }
   )
});

app.listen(port, () => {
    console.log(`Prayertime listening at http://localhost:${port}`);
})
