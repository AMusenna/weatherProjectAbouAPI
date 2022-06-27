const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

      res.sendFile(__dirname + "/index.html")

    })

app.post("/", function(req, res){

     const requery = req.body.cityName
     const metric = "metric"
     const appid = "65441206f989bc53319e2689fccdc638"

     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + requery + "&units=" + metric + "&appid=" + appid;

     https.get(url, function(response){
       console.log(response.statusCode);

       response.on("data", function(data){
         const weatherData = JSON.parse(data)
         const temp = weatherData.main.temp
         const weatherDescription = weatherData.weather[0].description
         const icon = weatherData.weather[0].icon
         const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

         res.write("<p>The weather currently " + weatherDescription + "</p>")
         res.write("<h1> The tempreture in " + requery + " is " + temp + " degrees Celcius. </h1>")
         res.write("<img src=" + imageUrl + " >")
         res.send();

   });
 })

})



app.listen(port, function() {
  console.log('example app listening on port ' + port);
});
