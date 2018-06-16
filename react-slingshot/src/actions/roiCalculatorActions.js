import * as types from '../constants/actionTypes';

import {getFormattedDateTime} from '../utils/dates';

// example of a thunk using the redux-thunk middleware
export function saveRoiCalculation(settings) {
  return function (dispatch) {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings
    return dispatch({
      type: types.SAVE_ROI,
      dateModified: getFormattedDateTime(),
      settings
    });
  };
}

export function calculateRoi(settings, fieldName, value) {
  return {
    type: types.CALCULATE_ROI,
    dateModified: getFormattedDateTime(),
    settings,
    fieldName,
    value
  };
}
