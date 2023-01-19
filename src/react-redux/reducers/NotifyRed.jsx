const initialState={
    notifications:0,
    unseen_chats:[]
}

export const NotificationReducer = (state= initialState, action) => {
    switch (action.type) {
      case "ADD_CHAT_NOTIFY":
        return {
          ...state, 
          unseen_chats: [action.payload.new_unseen_chat, ...state.unseen_chats],
          notification: store.notification + 1,
        };
    //   case REMOVE_SEEN_MSG:
    //     return { ...store, notification: payload.length, unseenmsg: payload };
      default:
        return state;
    }
  };