const express = require('express')
const adhan = require('adhan')
const moment = require('moment-timezone')
const app = express()
const port = 3000
const timezone = "Asia/Jakarta"

app.get('/', (req, res) => {
   var lat = '-6.385589';
   var long = '106.830711';
   var coordinates = new adhan.Coordinates(lat, long);
   var date = new Date();
   var params = adhan.CalculationMethod.MuslimWorldLeague();
   params.madhab = adhan.Madhab.Shafi
   params.fajrAngle = 20.0;
   params.ishaAngle = 18.0;
   params.adjustments.fajr = 2;
   params.adjustments.dhuhr = 2;
   params.adjustments.asr = 2;
   params.adjustments.maghrib = 2;
   params.adjustments.isha = 2;
   params.polarCircleResolution = adhan.PolarCircleResolution.AqrabYaum;

   var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

   res.send(
       {
          "summary": {
             "location": {
                "latitude": lat,
                "longitude": long
             },
             "date": moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD'),
             "prayerTime": {
                "fajr": moment(prayerTimes.fajr).tz(timezone).format('HH:mm'),
                "dzuhur": moment(prayerTimes.dhuhr).tz(timezone).format('HH:mm'),
                "ashar": moment(prayerTimes.asr).tz(timezone).format('HH:mm'),
                "maghrib": moment(prayerTimes.maghrib).tz(timezone).format('HH:mm'),
                "isya": moment(prayerTimes.isha).tz(timezone).format('HH:mm')
             }
          },
          "result": prayerTimes,
       }
   )
});

app.listen(port, () => {
    console.log(`Prayertime listening at http://localhost:${port}`);
})
