const request = require('request')

const rgeocode = (long,lat, callback) => {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+long+','+lat+'.json?access_token='+process.env.MAP_BOX+'&limit=1'
    // console.log(mapUrl)
    request({
        url: mapUrl,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to Geocoding service.", undefined)
        } else if (body.features.length == 0) {
            callback("Unable to find location.", undefined)
        } else {
            const data = body.features[0]
            callback(undefined, {
                location : data.place_name
            })
        }
    })
}

module.exports = rgeocode