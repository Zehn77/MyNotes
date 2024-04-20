import { combineReducers } from 'redux';
import stateSlice from './stateSlice';
const rootReducer = combineReducers({
    state: stateSlice
});
export default rootReducer;
