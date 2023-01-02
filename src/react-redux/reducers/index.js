import { combineReducers } from "redux";

import { TweetFeedReducer } from "./TweetFeedReducer";
import SearchReducer from "./SearchReducer";
import GoogleReducer from "./GoogleReducer";
import AuthReducer from "./authReducer";
import TweetLikeReducer from "./TweetLikeReducer";
import { BookmarkReducer } from "./BookmarkRed";
import TweetCreateReducer from "./TweetCreateReducer";
import { ProfileReducer } from "./ProfileRed";
import FollowReducer from "./FollowRed";
import { LikedTweetsPReducer } from "./likeTweetRed";
const rootReducer = combineReducers({
   AuthReducer,
   TweetFeedReducer,
   SearchReducer,
   GoogleReducer,
   BookmarkReducer,
   TweetLikeReducer,
   TweetCreateReducer,
   ProfileReducer,
   FollowReducer, 
LikedTweetsPReducer
})

export default rootReducer