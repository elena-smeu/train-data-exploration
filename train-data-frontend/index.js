import {Deck} from '@deck.gl/core';
import {INITIAL_VIEW_STATE} from './src/helpers';
import {Map_MapBox} from './src/map_austria';
import {train_routes_layer, train_stops_layer} from './src/layers';
import {toolboxInit} from './src/toolbox';
import {getStopByCoordinate} from "./src/helpers";
let isLightMode = false;


const stops_AT = require('./data/stops_AT.json');
const stops_ALL = require('./data/stops_ALL.json');
let routes = require('./data/stop_times_grp.json');

const stopFeatures = stops_AT.map(stop => 
    ({geometry: 
      {coordinates: stop.coordinates,
         type: "Point" },
    type: "Feature"
    , message: stop.stop_name
    }));
routes = routes.map((route) => {
  const firstOne = getStopByCoordinate(route.path[0], stops_ALL).stop_name;

  const lastStop = getStopByCoordinate(route.path[route.path.length - 1], stops_ALL).stop_name; 
  console.log(route);
  route['message'] = firstOne + " - " + lastStop; return route});
const map = Map_MapBox(isLightMode);
toolboxInit(isLightMode);
export const deck = new Deck({
  container: 'deck-canvas',
  initialViewState: INITIAL_VIEW_STATE,
  onViewStateChange: ({viewState}) => {
    map.jumpTo({
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom
    });
  },
  layers: [
   train_routes_layer(routes, isLightMode),
   train_stops_layer(stopFeatures, isLightMode)
  ],
  getTooltip: ({object}) => object && object.message,
  getCursor: () => "pointer"
});
