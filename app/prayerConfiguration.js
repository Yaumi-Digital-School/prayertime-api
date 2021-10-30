const adhan = require("adhan");
exports.getPrayerConfiguration = () => {
    let params = adhan.CalculationMethod.MuslimWorldLeague();
    params.madhab = adhan.Madhab.Shafi
    params.fajrAngle = 20.0;
    params.ishaAngle = 18.0;
    params.adjustments.fajr = 2;
    params.adjustments.sunrise = 2;
    params.adjustments.dhuhr = 2;
    params.adjustments.asr = 2;
    params.adjustments.maghrib = 2;
    params.adjustments.isha = 2;
    params.polarCircleResolution = adhan.PolarCircleResolution.AqrabYaum;
    return params;
}
