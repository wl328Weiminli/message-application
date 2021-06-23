import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";
import { setUnreadMessage } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
    // when receiving the message, if the message's sender equals the activeConversation, we need to call setUnreadMessage
    const activeConversation = store.getState().activeConversation;
    const conversations = store.getState().conversations;
    const conv = conversations.find(
      (aConv) => aConv.otherUser.username === activeConversation
    );
    if (conv) {
      store.dispatch(
        setUnreadMessage({
          activeConversation,
          unreadMessage: [data.message],
        })
      );
    }
  });
});

export default socket;
