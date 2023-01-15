import greenhome from "../../component/Assets/greenhome.svg"

const initialState = {
    loading: false,
    tomap: false,
    tohash:false,
    list: [],
    tweetList : [],
}
const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_SUCCEDED": return { ...state, list: action.payload, tweetList:'', tomap: true, loading: false, tohash:false }
        case "SEARCH_TWEET_SUCCEDED": {
            console.log(action.payload)
            return {
                ...state, tomap:true, loading:false, tweetList:action.payload.data.result, tohash:true, tomap:false,
            }
        }
        case "SEARCH_TWEET_FAILED": {
            console.log(action.payload)
            return {
                ...state,
            }
        }
        case "SEARCH_FAILED":{
            console.log(action.payload)

        }
      
        default: return state;
    }
}

export default SearchReducer

const initial = {
    title: "HOME",
    image:greenhome,
    x:"0"
}

const TitleNavBar = (state = initial, action) => {
    switch (action.type) {
        case "HOME_NAV": {
            return {
                ...state, title: action.payload.title, image: action.payload.image , x:action.payload.x
            }
        }
        case "NOTIFICATION_NAV": {
            return {
                ...state, title: action.payload.title, image: action.payload.image,x:action.payload.x
            }
        }
        case "BOOKMARK_NAV": {
            return {
                ...state, title: action.payload.title, image: action.payload.image,x:action.payload.x
            }
        }
        case "MESSAGE_NAV": {
            return {
                ...state, title: action.payload.title, image: action.payload.image,x:action.payload.x
            }
        }
        case "PROFILE_NAV": {
            return {
                ...state, title: action.payload.title, image: action.payload.image,x:action.payload.x
            }
        }
        case "TAG_TWEET_NAV":{
            return {
                ...state, title: action.payload.title, image: action.payload.image,
            }
        }
        default:{
            return state;
        }
    }
}
export {TitleNavBar}