$(document).ready(() => {
    geolocator.config({
        language: "en",
        google: {
            version: "3",
            key: "AIzaSyD5oLXzPS0A9N-z3VYZc0rnGu5yVuyK9Xg"
        }
    });

    window.onload = function () {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumWait: 10000,     // max wait time for desired accuracy
            maximumAge: 0,          // disable cache
            desiredAccuracy: 30,    // meters
            fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
            addressLookup: true,   // requires Google API key if true
            timezone: false,        // requires Google API key if true
        };
        geolocator.locate(options, function (err, location) {
            if (err) return console.log(err);
            console.log(err || location);
        });
    };
})