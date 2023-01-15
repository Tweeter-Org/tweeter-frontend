import BaseUrl from "./BaseUrl";

const MsgSearchUser = (char) => {
   return async function (dispatch) {
      await BaseUrl.get(`/search?find=${char}`)
         .then((res) => dispatch({
            type: "MSG_SEARCH_SUCCEDED",
            payload: res.data
         }))
         .catch((err) => {
            console.log(err)
            dispatch({
               type: "MSG_SEARCH_FAILED",
               payload: err
            })
         })
   }
}
export default MsgSearchUser