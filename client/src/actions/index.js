import axios from 'axios';

export const analyzeTweets = (twitterHandle) => async dispatch => {
    console.log("In the action!")
    dispatch({type: 'ANALYZE_TWEET', payload: null})
    const response = await axios.post('/api/analyze', twitterHandle);
    dispatch({type: 'RECEIVE_ANALYSIS', payload: response.data}    )
}