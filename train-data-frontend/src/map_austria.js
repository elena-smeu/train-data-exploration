import mapboxgl from "mapbox-gl";
import { LIGHT_MODE, DARK_MODE , INITIAL_VIEW_STATE} from "./helpers";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic21ldWVsZW5hIiwiYSI6ImNreWVmZjRuZjBlNG4ybnFwcGhlN3R5MWEifQ.74pQn39jtMpuSw647TLAFA";

export const Map_MapBox = (isLightMode) => (new mapboxgl.Map({
  container: 'map',
  style: isLightMode ? LIGHT_MODE.mapstyle : DARK_MODE.mapstyle,
  interactive: true,
  center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
  zoom: INITIAL_VIEW_STATE.zoom
}));
