const express = require("express");
const https = require("node:https");
const app = express();
const port = 3000

app.get("/", function(req, res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=HALLOOOOOOOOOOO";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The weather currently " + weatherDescription + "</p>")
      res.write("<h1> The tempreture in London is " + temp + " degrees Celcius. </h1>")
      res.write("<img src=" + imageUrl + " >")
      res.send();
    })

  });
})




app.listen(port, function() {
  console.log('example app listening on port ' + port);
});
