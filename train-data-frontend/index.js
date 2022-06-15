import {Map_MapBox} from './src/map_austria';
import {toolboxInit} from './src/toolbox';
import mapboxgl from "mapbox-gl";
let isLightMode = false;

const fetchData = async(hour) => {
  //The server is running on local !!!
  //You need to start it first
  return await fetch('http://127.0.0.1:5000/trips/'+(hour)+'/'+(parseInt(hour) + 1));
}

let map = Map_MapBox(isLightMode);

toolboxInit(isLightMode);
const data = (routes) => {
  return {
      type: 'FeatureCollection',
      features: routes.map( route => ({
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
        fetchData(1)
            .then(response => response.json())
            .then( responseData => 
                {
                  console.log(responseData); 
                  map.addSource('lines', {
                  'type': 'geojson',
                  'data': data(responseData.data)
                  }
                  );


                  map.addLayer({
                  'id': 'lines',
                  'type': 'line',
                  'source': 'lines',
                  'paint': {
                  'line-width': 3,
                  'line-color': ['get', 'color']
                  , 'line-opacity': 0.5
                  }
                  });
    });
  })
}

renderMap();
 $('.range input').on('input', (el) => {
        const hourValue =  $('.range input').val();
        const fetched = fetchData(hourValue);
        fetched.then(response => response.json()).then( responseData =>
          { 
            console.log(responseData.data);
            map.getSource('lines').setData(data(responseData.data))}
          )
        
      })
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

