import axios from "axios"

const LogInUser=(data, condition)=>{
   return async function (dispatch){
      if(condition){
         dispatch({type:"REQUEST_STARTED"})
         await axios.post("https://twitterbackend-production-93ac.up.railway.app/login",data)
         .then((res)=>dispatch({
            type:"REQUEST_SUCCEDED",
            payload:res.data }))
         .catch((err)=>{
            dispatch({
               type:"REQUEST_FAILED",
               payload:err
            })
         })   
      }
   }
}

export default LogInUser