const createTripReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_TRIP':
      return {
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    default:
      return state;
  }
};

export default createTripReducer;
