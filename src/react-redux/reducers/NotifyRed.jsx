const initialState={
    notifications:0,
    unseenChats:[],
    viewNotifs:{},
    loading:false,
    notifyBool:false,
    notifyRead:false,
    notifTweet:{}
}

export const NotificationReducer = (state= initialState, action) => {
    switch (action.type) {

      case "View_Notifs_Started":{
        return {...state, loading:true}
    }
    case "View_Notifs_Succeed":{
      
        return {...state, loading:false, viewNotifs:action.payload.data.notifications, notifyBool:true}
    }
    case "View_Notifs_Failed":{
       
        return {...state, loading:false,}
    }
    case "Read_Notifs_Succeed":{
     
      return {...state, loading:false, notifyRead:action.payload}
  }
  case "Read_Notifs_Failed":{
     
      return {...state, loading:false,}
  }
      case "ADD_CHAT_NOTIFY":
       
        return {
          ...state, 
          unseenChats: [action.payload.newUnseenChat, ...state.unseenChats],
          notifications: state.notifications + 1,
        };
        case "NOTIFY_CHAT_SEEN":{
          return {
            ...state, 
            // unseenChats:(state.unseenChats.filter(ch)=>{return ch._id != })
          }
        }
        case "View_Notif_Tweet_Started":{
          return {
            loading:true, ...state
          }
        }
        case "View_Notif_Tweet_Succeed":{
          return {
            loading:false, ...state, notifTweet:action.payload.data.tweet
          }
        }
        case "View_Notif_Tweet_Failed":{
          return {
            loading:false, ...state
          }
        }
    //   case REMOVE_SEEN_MSG:
    //     return { ...store, notification: payload.length, unseenmsg: payload };
      default:
        return state;
    }
  };