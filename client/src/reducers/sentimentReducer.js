export default function(state = {loading: false}, action){
    console.log("In the reducer!")
    switch(action.type){
        case 'ANALYZE_TWEET': 
            return {
                ...state,
                loading: true
            }
        case 'RECEIVE_ANALYSIS': 
            if(action.payload){
                return {
                    payload: action.payload,
                    loading: false
                }
            }
        default: 
            return state;
    }
}