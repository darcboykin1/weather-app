const request = require("request");

const forecast = (lat, long, callback) =>{
    const url = "https://api.darksky.net/forecast/2c0292cc207161754efd0b46fc31a0d3/" + lat + "," + long + "?units=us";

    request({url: url, json: true}, (error, response)=>{
        const {temperature, precipProbability} = response.body.currently;
        const {summary} = response.body.daily.data[0];
        const {body} = response.body;

        if(error){
            callback("Unable to connect to the darksky API", undefined)
        }else if(response.body.error){
            callback("Unable to find weather for that location. Please try another query.", undefined)
        }else{
            // const temp = response.body.currently.temperature;
            // const rainChance = response.body.currently.precipProbability;
            callback(undefined, `${summary} It is currently ${temperature} degrees. There is a ${precipProbability}% chance of rain.`);
        }
    })

}

module.exports = forecast;

