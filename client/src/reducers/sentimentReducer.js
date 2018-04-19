export default function(state = null, action){
    switch(action.type){
        case 'ANALYZE_TWEET': 
            if(action.payload){
                return action.payload;
            }
            return false;
        default: 
            return state;
    }
}