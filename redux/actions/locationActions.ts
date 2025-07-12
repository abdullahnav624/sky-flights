import { SET_FROM_LOCATIONS, SET_TO_LOCATIONS } from "../locationActionTypes";

export const setFromLocations = (locations: any[]) => ({
  type: SET_FROM_LOCATIONS,
  payload: locations,
});

export const setToLocations = (locations: any[]) => ({
  type: SET_TO_LOCATIONS,
  payload: locations,
});
