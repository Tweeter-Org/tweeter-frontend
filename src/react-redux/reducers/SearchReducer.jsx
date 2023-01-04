const initialState = {
    loading: false,
    tomap: false,
    list: []
}
const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_SUCCEDED": return { ...state, list: action.payload, tomap: true, loading: false }
        default: return state;
    }
}

export default SearchReducer

const initial = {
    title: "HOME",
    image:"greenhome",
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
        default:{
            return state;
        }
    }
}
export {TitleNavBar}