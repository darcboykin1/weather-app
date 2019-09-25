const request = require("request");
const chalk = require("chalk");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGFyY2JveWtpbiIsImEiOiJjazA3OHNuMHcwMXc0M29rYWE0NWM4OXh3In0.l4UJDpwUT6-c2TJpPB1IWQ&limit=1"

    request({url:url, json:true}, (error, response)=>{
        

        if(error){
            callback('Unable to connect to location services', undefined)
            // runs the anonymous function that was passed into geocode. taking the above string as the first argument
            // and setting the second argument to undefined
            // when the anon function that was passed into geocode runs, it will log the first console log, populating the
            // error variable with the above string. The second log will run with its variable as undefined, since the callback
            // function call was initiated with the second variable set to undefined
        } else if (response.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const {geometry, place_name} = response.body.features[0];

            callback(undefined, {
                latitude: geometry.coordinates[1],
                longitude: geometry.coordinates[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode