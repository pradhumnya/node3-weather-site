const request = require('request')

const geocode = function(address, callback){
    const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXlyZGFlbW9ucyIsImEiOiJjazUwdzVrM2swMzM2M2pwOGJ1dHQ4cGYxIn0.T68hxxm-GfEKhpxdnX8Ipw&limit=1'
    request({url: url1, json: true}, function(error, response){
        if(error){
            callback("Trouble connecting to geostation api", undefined)
        }else if(response.body.features.length === 0){
            callback("Check your co-ordinates",undefined)
        }else{
            const longitude = response.body.features[0].center[0]
            const latitude = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
            callback(undefined, {
                longitude: longitude,
                latitude: latitude,
                location: location})        
        }
    
    })
}

module.exports = geocode