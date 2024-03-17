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

const startReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_START_DATE':
      return action.payload;
    default:
      return state;
  }
};

const endReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_END_DATE':
      return action.payload;
    default:
      return state;
  }
};

export default tripsReducer;
