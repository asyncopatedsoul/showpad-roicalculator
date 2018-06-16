import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import roiScenario from './roiCalculatorReducer'
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  roiScenario,
  routing: routerReducer
});

export default rootReducer;
