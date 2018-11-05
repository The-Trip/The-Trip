import { combineReducers } from 'redux';
import setAPIFetchResults from './setAPIFetchResults'


export default combineReducers({
    APIResults: setAPIFetchResults,
});