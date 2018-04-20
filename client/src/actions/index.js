import axios from 'axios';

export const analyzeTweets = (twitterHandle) => async dispatch => {
    console.log("In the action!")
    console.log(twitterHandle);
    dispatch({type: 'ANALYZE_TWEET', payload: null})
    const response = await axios.get('/api/analyze', {params: {handle: twitterHandle}});
    dispatch({type: 'RECEIVE_ANALYSIS', payload: response.data}    )
}