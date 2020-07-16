const request = require('postman-request')
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoic3Jpbml2YXNhbi1uYXJhc2ltbWFuIiwiYSI6ImNrYnQ5eXpoMTA3eHkydXN3OThvYmt2aDkifQ.W6015jjRTYFIr2WlhJOw5Q&limit=1"

    request({url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Map box service currently unavailable', undefined)
        } else if (body.features.length === 0) {
            callback('No Lat longs available for this location', undefined)
        } else {
            const {place_name: name} = body.features[0]
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: name
            })
        }
    })
}

module.exports = geocode