import {SAVE_ROI, CALCULATE_ROI} from '../constants/actionTypes';
import {necessaryDataIsProvidedToCalculateROI, calculateROIScenario} from '../utils/roiCalculator';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function roiCalculatorReducer(state = initialState.roiScenario, action) {
  let newState;

  switch (action.type) {
    case SAVE_ROI:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {dateModified: action.dateModified});

    case CALCULATE_ROI:
      newState = objectAssign({}, state);
      newState[action.fieldName] = action.value;
      newState.necessaryDataIsProvidedToCalculateROI = necessaryDataIsProvidedToCalculateROI(newState);
      newState.dateModified = action.dateModified;

      if (newState.necessaryDataIsProvidedToCalculateROI) {
        newState.roiResult = calculateROIScenario(newState);
      }

      return newState;

    default:
      return state;
  }
}
