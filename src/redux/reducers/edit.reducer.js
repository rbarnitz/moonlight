const initialState = {
  trips: [], // Array to store all trips
  tripToEdit: null, // Object to store the trip being edited
};

const editReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VIEW_TRIP':
      return {
        ...state,
        tripToEdit: action.payload,
      };
    case 'EDIT_TRIP':
      return {
        ...state,
        tripToEdit: action.payload,
      };
    case 'DELETE_TRIP':
      return {
        ...state,
        tripToEdit: action.payload,
      };
    default:
      return state;
  }
};

export default editReducer;
