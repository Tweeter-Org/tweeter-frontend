const initialState = {
    sharedSuccess: ""
}

export const ShareTweetRed = (state = initialState, action) => {
    switch (action.type) {
        case "SHARE_TWEET": {
            return state;
        }
        case "SHARE_TWEET_YES": {
            console.log(action.payload)
            return {
                ...state, sharedSuccess: action.payload.data.success
            }
        }
        case "SHARE_TWEET_NO": {
            console.log(action.payload)
            return {
                ...state, sharedSuccess: action.payload.data.success
            }

        }
        default: return state;
    }

}