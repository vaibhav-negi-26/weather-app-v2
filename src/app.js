const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utility/geocode')
const forecast = require('./utility/forecast')

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
        msg: 'Hello there from Help Page.',
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

app.listen(3000, () => {
    console.log('Listening on port 3000');
})