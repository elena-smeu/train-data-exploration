export const LIGHT_MODE = {mapstyle: 'mapbox://styles/mapbox/light-v10', train_stop_color: [0, 0, 0, 100]}
export const DARK_MODE = {mapstyle: 'mapbox://styles/mapbox/dark-v10', train_stop_color: [160, 160, 180, 200]}

export const INITIAL_VIEW_STATE = {
  latitude: 47.5162,
  longitude: 14.53,
  zoom: 7
};

export const getStopByCoordinate = ([lat, long], stops) => {
    const stopToIterate = stops;
    const found = stopToIterate.filter(stop => 
        {
            if( stop.coordinates[0] == lat && stop.coordinates[1] == long) {
                return true
            }
            else false
        }
        )[0]
    return found !== undefined ? found : "";
}