import axios from 'axios';

export const analyzeTweets = (twitterHandle) => async dispatch => {
    
    const response = await axios.post('/api/analyze', twitterHandle);
    dispatch({type: 'ANALYZE_TWEET', payload: response.data}    )
}