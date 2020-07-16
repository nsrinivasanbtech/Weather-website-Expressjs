const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ea50eb5a6b2047780efc619838e3ad60&query='+ lat +','+ long +'&units=m'

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Weather service is currently unavailable', undefined)
        } else if(body.error){
            callback(body.error.info, undefined)
        } else {
            const { feelslike, temperature } = body.current
            callback(undefined, body.current.weather_descriptions[0]+' It is currently '+ temperature +' degrees out. It feels like '+ feelslike +' degrees out.')
        }
    })
}

module.exports = {
    forecast: forecast
}