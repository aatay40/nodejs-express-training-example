var express = require("express");
var app = express();

var request = require("request");
app.set("views", "./");
app.set("view engine", "ejs");

app.get("/weather", function(req, response) {
  var city = req.query.city;
  const apiKey = "c239b3c4276cb7efbf94ff3dc9a735f9";
  const urlAddress = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  request(urlAddress, function(err, res, body) {
    const data = JSON.parse(body);
    response.render("index", {
      degrees: Math.round(data.main.temp - 273.15),
      title: data.name,
      icon: data.weather[0].icon
    });
  });
});

app.listen(5001);
