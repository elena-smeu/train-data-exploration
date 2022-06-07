import { LIGHT_MODE, DARK_MODE } from "./helpers";
import {GeoJsonLayer, PathLayer} from '@deck.gl/layers';

export const train_stops_layer  = (stopFeatures, isLightMode) => ( 
    new GeoJsonLayer({
      id: 'train-stops',
      data: stopFeatures,
      // Styles
      filled: true,
      pickable: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 1300,
      getPointRadius: 1.5,
      getFillColor: isLightMode? LIGHT_MODE.train_stop_color : DARK_MODE.train_stop_color.map
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
    getColor: [63, 195, 128, 5]
    , onClick: (info, e) =>  console.log(info)
    })
)