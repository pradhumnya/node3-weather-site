const request = require('request')


const forecast = function(latitude, longitude, callback){
    const url = 'https://api.darksky.net/forecast/a31142d23ccf70f9ce8f587ace6a85fb/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url: url, json: true }, (error, response) => {
        if(error){
            callback("Network error", undefined)
        }else if(response.body.error){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')       
        }
    })
}

module.exports = forecast