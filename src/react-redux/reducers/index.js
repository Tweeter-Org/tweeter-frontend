import { combineReducers } from "redux";

import { TweetFeedReducer } from "./TweetFeedReducer";
import SearchReducer from "./SearchReducer";
import GoogleReducer from "./GoogleReducer";
import AuthReducer from "./authReducer";
import TweetLikeReducer from "./TweetLikeReducer";
import { BookmarkReducer } from "./BookmarkRed";
import TweetCreateReducer from "./TweetCreateReducer";
import { ProfileReducer } from "./ProfileRed";
const rootReducer = combineReducers({
   AuthReducer,
   TweetFeedReducer,
   SearchReducer,
   GoogleReducer,
   BookmarkReducer,
   TweetLikeReducer,
   TweetCreateReducer,
   ProfileReducer
})

export default rootReducer