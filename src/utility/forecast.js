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
            const result = `${body.daily.data[0].summary} Current temperature is ${body.currently.temperature} °F, humidity is ${body.daily.data[0].humidity} and ${body.currently.precipProbability}% chance of rain.`
            callback(undefined,result)        
        }
    })
}
module.exports = forecast