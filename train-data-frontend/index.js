import {Deck} from '@deck.gl/core';
import {INITIAL_VIEW_STATE} from './src/helpers';
import {Map_MapBox} from './src/map_austria';
import {train_routes_layer, train_stops_layer} from './src/layers';
import {toolboxInit} from './src/toolbox';

let isLightMode = true;

const stops = require('./data/stops_AT.json');
const routes = require('./data/stop_times_grp.json');

const stopFeatures = stops.map(stop => 
    ({geometry: 
      {coordinates: stop.coordinates,
         type: "Point" },
    type: "Feature"
    }));

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
   train_stops_layer(stopFeatures, isLightMode),
   train_routes_layer(routes, isLightMode) 
  ]
});
