const initialState = {
    sharedSuccess: ""
}

export const ShareTweetRed = (state = initialState, action) => {
    switch (action.type) {
        case "SHARE_TWEET": {
            return state;
        }
        case "SHARE_TWEET_YES": {
            return {
                ...state, sharedSuccess: action.payload.data.success
            }
        }
        case "SHARE_TWEET_NO": {
            return {
                ...state, sharedSuccess: action.payload.data.success
            }

        }
        default: return state;
    }

}