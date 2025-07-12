import { SET_FROM_LOCATIONS, SET_TO_LOCATIONS } from "../locationActionTypes";

const initialState = {
  fromLocations: [],
  toLocations: [],
};

const locationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FROM_LOCATIONS:
      return {
        ...state,
        fromLocations: action.payload,
      };
    case SET_TO_LOCATIONS:
      return {
        ...state,
        toLocations: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
