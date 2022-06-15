import {Map_MapBox} from './src/map_austria';
import {toolboxInit} from './src/toolbox';
import {DARK_MODE,LIGHT_MODE, getStopByCoordinate} from "./src/helpers";
import mapboxgl from "mapbox-gl";
let isLightMode = false;

const stops_AT = require('./data/stops_AT.json');
const stops_ALL = require('./data/stops_ALL.json');
let routes = require('./data/stop_times_grp.json');

let id = 0;
let goodRoutes = require("./data/stop_times_all.json");

console.log(goodRoutes);


const stopFeatures = stops_AT.map(stop => 
    ({geometry: 
      {coordinates: stop.coordinates,
         type: "Point" },
    type: "Feature"
    , message: stop.stop_name
    }));

let map = Map_MapBox(isLightMode);
console.log(goodRoutes);

toolboxInit(isLightMode);

const data = (hour) => {
  return {
      type: 'FeatureCollection',
      features: goodRoutes.map( route => ({
          type: 'Feature',
          properties: {
            color: '#F7455D'
            , title: route.path[0].stop_name + " - " + route.path[route.path.length - 1].stop_name
          }
          , geometry: {
            type: 'LineString'
            , coordinates: route.path.map(path => path.coordinates)
          }
        }
        
        ))
  
  }
}

const renderMap = () => {
map.on('load', () => {
map.addSource('lines', {
'type': 'geojson',
'data': data(1)
}
);


map.addLayer({
'id': 'lines',
'type': 'line',
'source': 'lines',
'paint': {
'line-width': 3,
// Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
// to set the line-color to a feature property value.
'line-color': ['get', 'color']
, 'line-opacity': 0.5
}
});
id++;
$('.range input').on('input', (el) => {
  const hourValue =  $('.range input').val();
  map.getSource('lines').setData(data(hourValue));
})


});

}

renderMap();

//**Tooltip stuff */
map.on('click', (event) => {
  const features = map.queryRenderedFeatures(event.point);

  if (!features.length) {
  return;
  }
  const feature = features[0];
  
  const popup = new mapboxgl.Popup({ offset: [0, -15] })
  .setLngLat(feature.geometry.coordinates[0])
  .setHTML(
  `<h3>${feature.properties.title}</h3>`
  )
  .addTo(map); 

});

