const initialState={
    loading:false,
    tomap:false,
list:[]
}
 const SearchReducer =(state=initialState,action)=>{
    switch(action.type){
        case "SEARCH_SUCCEDED": return {...state, list:action.payload, tomap:true}
        default : return state;
    }
 }

export default SearchReducer 