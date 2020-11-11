var myMap = L.map("map", {
  center: [40, -120],
  zoom: 5
});


L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 500,
maxZoom: 20,
zoomOffset: -1,
id: "mapbox/light-v10",
accessToken: API_KEY
}).addTo(myMap);

var urlEarthquake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// map data
d3.json(urlEarthquake, function(data) {
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    weight: 0.5
  };
}

function getColor(magnitude) {
  switch (true) {
    case magnitude > 7:
      return "#FF0000";
    case magnitude > 6:
      return "#FF4500";
    case magnitude > 5:
      return "#FF8C00";
    case magnitude > 4:
      return "#FFA500";
    case magnitude > 3:
      return "#FFD700";
    case magnitude > 2:
      return "#FFFF00";
    case magnitude > 1:
      return "#ADFF2F";
    default:
      return "#00FF00";
  }
}

function getRadius(magnitude) {
  if (magnitude ===0) {
    return 1;
  }
  return magnitude*7;
}


//GeoJson to map
L.geoJson(data, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng);
  },
  style: styleInfo,
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Mag: " + feature.properties.mag + "<br>Place: " + feature.properties.place);
  }

}).addTo(myMap);

})