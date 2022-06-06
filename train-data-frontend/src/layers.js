import { LIGHT_MODE, DARK_MODE } from "./helpers";
import {GeoJsonLayer, PathLayer} from '@deck.gl/layers';

export const train_stops_layer  = (stopFeatures, isLightMode) => ( 
    new GeoJsonLayer({
      id: 'train-stops',
      data: stopFeatures,
      // Styles
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 1000,
      getPointRadius: 1,
      getFillColor: isLightMode? LIGHT_MODE.train_stop_color : DARK_MODE.train_stop_color
    })
)
export const train_routes_layer = (routes, isLightMode) => (
  new PathLayer({
      id: 'train-routes',
      data: routes,
    pickable: true,
    widthScale: 20,
    widthMinPixels: 5,
    getPath: d => d.path,
    getWidth: 10,
    getColor: [27, 163, 156, 1]
    })
)