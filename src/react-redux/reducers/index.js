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
import { TitleNavBar } from "./SearchReducer";
import { DeleteTweetsPReducer } from "./TweetDltReducer";
import { ProfileNameReducer } from "./ProfileRed";
import { TagTweetFeedReducer } from "./TagTweetReducer";
import { ReplyReducer } from "./ReplyReducer";
import { TweetFeedCountRed } from "./TweetFeedReducer";
import MsgSearchReducer from "./messageRed";
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
   LikedTweetsPReducer,
   TitleNavBar,
   DeleteTweetsPReducer,
   ProfileNameReducer,
   TagTweetFeedReducer,
   ReplyReducer,
   TweetFeedCountRed, 
   MsgSearchReducer
})

export default rootReducer