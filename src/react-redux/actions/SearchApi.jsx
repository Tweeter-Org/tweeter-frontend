import BaseUrl from "./BaseUrl";

const SearchUser = (char) => {
   return async function (dispatch) {
      await BaseUrl.get(`/search?find=${char}`)
         .then((res) => dispatch({
            type: "SEARCH_SUCCEDED",
            payload: res.data
         }))
         .catch((err) => {
            console.log(err)
            dispatch({
               type: "SEARCH_FAILED",
               payload: err
            })
         })
   }
}
export default SearchUser

const SearchTweetWithTag = (char) => {
   const accessToken = localStorage.getItem("access token")
   const config = {
      headers: {
         "Authorization": `Bearer ${accessToken}`
      }
   }
   return async function (dispatch) {
      await BaseUrl.get(`/t/tags?find=${char}`, config)
         .then((res) => dispatch({
            type: "SEARCH_TWEET_SUCCEDED",
            payload: res
         }))
         .catch((err) => {
            dispatch({
               type: "SEARCH_TWEET_FAILED",
               payload: err
            })
         })
   }
}

export { SearchTweetWithTag }

export const Home = (image, title, x) => {
   return {
      type: "HOME_NAV",
      payload: {
         title,
         image,
         x
      }
   }

}
export const Notifications = (image, title, x) => {
   return {
      type: "NOTIFICATION_NAV",
      payload: {
         title,
         image,
         x
      }
   }
}
export const BookmarksNav = (image, title, x) => {
   return {
      type: "BOOKMARK_NAV",
      payload: {
         title,
         image,
         x
      }
   }
}
export const Messages = (image, title, x) => {
   return {
      type: "MESSAGE_NAV",
      payload: {
         title,
         image,
         x
      }
   }
}
export const Profile = (image, title, x) => {
   return {
      type: "PROFILE_NAV",
      payload: {
         title,
         image,
         x
      }
   }
}
export const TagtweetNav = (image, title) => {
   return {
      type: "TAG_TWEET_NAV",
      payload: {
         title,
         image,

      }
   }

}