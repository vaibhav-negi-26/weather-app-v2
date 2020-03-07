const request = require('request')

const forecast = (lat, long, callback) => {
    const drakUrl = 'https://api.darksky.net/forecast/99840a089b5eac0c9a0a0049b2f18c42/' + lat + ',' + long
    request({
        url: drakUrl,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error) {
            callback("Unable to find location.", undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} fahrenheit out there. There is a ${body.currently.precipProbability}% change of rain.`)        
            // callback(undefined, {
            //     forecast: body.daily.data[0].summary,
            //     temp: body.currently.temperature
            // })
        }
    })
}
module.exports = forecast