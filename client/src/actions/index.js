import axios from 'axios';

export const analyzeTweets = (twitterHandle) => async dispatch => {
    console.log(twitterHandle);
    const response = await axios.post('/api/analyze', twitterHandle);
    dispatch({type: 'ANALYZE_TWEET', payload: response.data}    )
}