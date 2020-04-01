const request = require('request')

const forecast = (lat, long, callback) => {
    const drakUrl = 'https://api.darksky.net/forecast/' + process.env.DARK_SKY + '/' + lat + ',' + long
    // console.log(drakUrl)
    request({
        url: drakUrl,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error) {
            callback("Unable to find location.", undefined)
        } else {
            const temp = body.currently.temperature
            const celcius = ((temp-32) * (5 / 9)).toFixed(2)
            const result = `${body.daily.data[0].summary} Current temperature is ${celcius} °C, humidity is ${body.daily.data[0].humidity} and ${body.currently.precipProbability}% chance of rain.`
            callback(undefined, result)
        }
    })
}
module.exports = forecast