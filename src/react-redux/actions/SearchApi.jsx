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