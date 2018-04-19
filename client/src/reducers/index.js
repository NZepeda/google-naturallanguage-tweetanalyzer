import {combineReducers} from 'redux';
import sentimentReducer from './sentimentReducer'

export default combineReducers({
    sentiment: sentimentReducer
});