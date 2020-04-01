const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utility/geocode')
const forecast = require('./utility/forecast')
const rgeocode = require('./utility/rgeocode')
const port = process.env.PORT

// Defining path for express config
const publicDir = path.join(__dirname, '../public/')
const viewPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

// Setup handleBars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory for serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vaibhav Singh Negi'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Vaibhav Singh Negi'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'About',
        msg: 'Enter Your city in the input field on home page and hit search button, then wait for a couple of seconds forcast of your location will be displayed soon.',
        msg2: 'Your can also Allow the Geolocation service so that we can access your location and tell your forecast automatically',
        name: 'Vaibhav Singh Negi'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address.'
        })
    }
    const place = req.query.address
    geocode(place, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            // using shorthand property and passing a obj with a property error and value also error
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })

    })
})

app.get('/weather-allow', (req, res) => {
    if (!req.query.lat || !req.query.long) {
        return res.send({
            error: 'You must provide a address.'
        })
    }
    const latitude = req.query.lat
    const longitude = req.query.long
    rgeocode(longitude,latitude,(error,loc) =>{
        if(error){
            return res.send({error})
        }
        const location = loc
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location : location.location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Help article not found.',
        CSS: '/css/style.css'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Page not found.',
        CSS: 'css/style.css'
    })
})
app.listen(port, () => {
    console.log('Listening on port '+port);
})