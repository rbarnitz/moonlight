const initialState = {
  trips: [],
};

const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRIPS':
      return {
        ...state,
        trips: action.payload,
      };
    default:
      return state;
  }
};

export default tripsReducer;
