import { combineReducers } from "redux";
import locationReducer from "./locationReducer";

const rootReducer = combineReducers({
  location: locationReducer,
  // other reducers if any
});

export default rootReducer;
