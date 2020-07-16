const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

// define path for express config
const publicDirectory = path.join( __dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', ( req, res ) => {
    res.render('index',{
        title: 'Weather',
        name: 'Sri'
    })
})

app.get('/about', ( req, res ) => {
    res.render('about',{
        title: 'About mE',
        name: 'Sri'
    })
})

app.get('/help', ( req, res ) => {
    res.render('help',{
        message: 'Ready to help U',
        name: 'Sri',
        title: 'Help'
    })
})

app.get('/weather', ( req, res ) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error) {
            return res.send({
                Error: error
            })
        }
        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    Error: error
                })
            }
            res.send({
                forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Hepl page Article not found',
        name: 'Sri',
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        message: 'This is my 404 PAGE',
        name: 'Sri',
        title: '404'
    })
})

app.listen( port, () => {
    console.log('Server is Up on port ' + port)
})