const locationReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LOCATION_INFO':
      return {
        latitude: action.payload.lat,
        longitude: action.payload.lng,
        searchedLocation: action.payload.searchedLocation,
        timezone: action.payload.timezone,
      };
    default:
      return state;
  }
};

export default locationReducer;
