const initialState={
    notifications:0,
    unseen_chats:[],
    viewNotifs:{},
    loading:false,
    notifyBool:false,
    notifyRead:false
}

export const NotificationReducer = (state= initialState, action) => {
    switch (action.type) {

      case "View_Notifs_Started":{
        return {...state, loading:true}
    }
    case "View_Notifs_Succeed":{
        console.log(action.payload)
        return {...state, loading:false, viewNotifs:action.payload.data.notifications, notifyBool:true}
    }
    case "View_Notifs_Failed":{
        console.log(action.payload)
        return {...state, loading:false,}
    }
    case "Read_Notifs_Succeed":{
      console.log(action.payload)
      return {...state, loading:false, notifyRead:action.payload}
  }
  case "Read_Notifs_Failed":{
      console.log(action.payload)
      return {...state, loading:false,}
  }
      case "ADD_CHAT_NOTIFY":
        return {
          ...state, 
          unseen_chats: [action.payload.new_unseen_chat, ...state.unseen_chats],
          notification: state.notification + 1,
        };
    //   case REMOVE_SEEN_MSG:
    //     return { ...store, notification: payload.length, unseenmsg: payload };
      default:
        return state;
    }
  };