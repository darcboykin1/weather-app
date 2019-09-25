const path = require("path");
const express= require("express");
const hbs = require("hbs");
const chalk = require("chalk");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

// defining the paths for express configuration
const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
// setting the view engine that we installed with npm.
app.set('views', viewsPath);
// setting the path from which the views will come
hbs.registerPartials(partialsPath);
// registering the path the the partials will come from

// Setup static directory to serve
app.use(express.static(public));


app.get("", (req, res)=>{
    res.render("index", {
        title: "Weather App",
        name: "Darc"
    })
})

app.get("/about", (req, res)=>{
    res.render("about", {
        title: "About page",
        name: "Darc"
    });
})

app.get("/help", (req, res)=>{
    res.render("help", {
        message: "this is the help page",
        title: "Help Page",
        name: "Darc",
        credit: "created using both the Dark Sky API and the MapBox API"
    });
});

// app.com/weather 
app.get("/weather", (req, res)=>{
    const reqLocation = req.query.address;

    if(!reqLocation){
        return res.send({
            error: "Please enter a valid address"
        });
    }


    // this is not the function being defined. It is the function being called. Instead what is being defined
    // is the anonymous callback function
    geocode(reqLocation, (error, {latitude, longitude, location} = {})=>{

        if(error){ 
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }

            res.send({
                location,
                forecastData,
                reqLocation
            })
        })
    });
});


app.get("/help/*", (req, res)=>{
    res.render("404",{
        title: "404",
        message: "Help Article Not found",
        name: "Darc"
    });
});

app.get("*", (req, res)=>{
    res.render("404",{
        title: "404",
        message: "Page not found",
        name: "Darc"
    });
})

app.listen(port, ()=>{
    console.log("Server is listening on port " + port);
});