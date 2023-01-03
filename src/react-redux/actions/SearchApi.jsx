import BaseUrl from "./BaseUrl";

const SearchUser=(char)=>{
    return async function (dispatch){
      console.log("dvh")
          await BaseUrl.get(`/search?find=${char}`)
          .then((res)=>dispatch({
             type:"SEARCH_SUCCEDED",
             payload:res.data }))
          .catch((err)=>{
             dispatch({
                type:"SEARCH_FAILED",
                payload:err
             })
          })   
    }
 }
 
 export default SearchUser

 export const Home=(image,title,x)=>{
   return {
      type:"HOME_NAV",
      payload:{
         title,
         image,
         x
   }
   }
      
 }
 export const Notifications=(image,title,x)=>{
   return {
      type:"NOTIFICATION_NAV",
      payload:{
         title,
         image,
         x
   }
   }
 }
 export const BookmarksNav=(image,title,x)=>{
      return {
         type:"BOOKMARK_NAV",
         payload:{
            title,
            image,
            x
      }
      }
 }
 export const Messages=(image,title,x)=>{
      return {
         type:"MESSAGE_NAV",
         payload:{
            title,
            image,
            x
      }
      }
 }
 export const Profile=(image,title,x)=>{
      return {
         type:"PROFILE_NAV",
         payload:{
            title,
            image,
            x
      }
      }
 }