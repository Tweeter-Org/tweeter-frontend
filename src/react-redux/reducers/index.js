import { combineReducers } from "redux";

import { TweetFeedReducer} from "./TweetFeedReducer";
import SearchReducer from "./SearchReducer";
import GoogleReducer from "./GoogleReducer";
import AuthReducer from "./authReducer";

const rootReducer = combineReducers({
     AuthReducer,
      TweetFeedReducer
      ,SearchReducer, GoogleReducer
   })

  export default rootReducer