const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

app.set('view engine', 'hbs') //app.set used to set value for a setting. view engine is the setting and hbs(handlebars) is the value
//Views is supposed to be the folder where handlebar templates are there. We can customize it to some other location
const viewpath = path.join(__dirname, '../templates/views')
app.set('views', viewpath) //telling express to look here for views

// console.log(path.join(__dirname, '../public'))
app.use(express.static(path.join(__dirname, '../public'))) //express.static is used to serve static files. Here we define the public directory path.

//setting up partials
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)
// app.get('', function(req, res){     //.get method used to decide what to send back when request is made. '' conatins the partial url after the main domain. The function deciddes what to send back to them.
// //'req' contains information about the incoming request to the server. 'res' contains the response that we need to send back
// res.send('Hello express!')

// })
// app.get('/help', function(req, res){
//     res.send('Help Page')
// })
// app.get('/about', function(req, res){
//     res.send('<h1>About Page</h1>')
// })
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Me'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Me'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helping you',
        name: 'Me',
        title: 'Help_page'
    })
})
app.get('/weather', function(req, res){
    if(!req.query.address){
        return res.send({   //direct return is done so that the function ends there and there otherwise the code below will also run and produce an error in the terminal. 
            error: 'Please provide with a address!'
        })
    } //else can be used if you don't wan't to use return
    geocode(req.query.address, function(error, data){
        if(error){
            return res.send({error})
        }
    
        forecast(data.longitude, data.latitude, function(error, forecastData){
            if(error){
                return res.send({ error})
            }
            res.send({ 
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
            console.log(data.location)
            console.log(forecastData)
        })
    })
    // res.send({ 
    //     forecast: 'It is snowy.',
    //     location: 'Philadephia',
    //     address: req.query.address
    // }) 
    //res.send({ name: menubar, age: lop}) //even if an object is send express is going to turn it into json.
})
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Enter a search product'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Me',
        errorMessage: 'No help further',
        title: '404'
    })
})
app.get('*', (req, res) => {  // '*' is a express wildcard character used to match everything else that hasn't beeen matched yet
    res.render('404', {
        name: 'Me',
        errorMessage: 'Page not found',
        title: '404'
    })
})

app.listen(port, function(){
    console.log('Server is up and running at' + port) //gets displayed when the application is running on the terminal
}) //it starts up the server(the process of starting up a server is asynchronous process) and has it listen to a particular port. The second argument is a callback function that we have passed when the server is up and running.
