// Creating map object

var map = L.map("map", {
  center: [40.00, -100.00],
  zoom: 4
});

const API_KEY = "pk.eyJ1IjoiZ21sZWFjaDE0IiwiYSI6ImNrZnJnNW5lMDBkN24ycm53a2UyZWVxMHgifQ.JHLY7VqBDQ5JY8yePS1O9w";

// Adding tile layer

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(link, function(data) {
  console.log(data)
  var featuresarray = data.features
  for (var i = 0; i < featuresarray.length; i++) {
  var mycoordinates= featuresarray[i].geometry.coordinates
  var magnitud = featuresarray[i].properties.mag
  var mysize = magnitud * 10000
  var myplace = featuresarray[i].properties.place
  var mytype = featuresarray[i].properties.type
  var color = "";
  if (mysize > 50000) {
    color = "red";
  }
  else if (mysize > 40000) {
    color = "orange";
  }
  else if (mysize > 30000) {
    color = "#E49B24";
  }
  else if (mysize > 20000) {
    color = "lightorange";
  }
  else if (mysize > 10000) {
    color = "yellow";
  }
  else {
    color = "lime";
  }
    L.circle([mycoordinates[1],mycoordinates[0]], {
      stroke: true,
      fillOpacity: 0.50,
      color: "black",
	  weight: 0.50,
      fillColor: color,
      radius: mysize
    }).bindPopup("<h1>" + mytype + "</h1> <hr> <h3>Magnitud: " + magnitud + "</h3> <hr> <h3>Place: " + myplace + "</h3>").addTo(map)
  }
});