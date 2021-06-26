import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setMessageStatus,
} from "./store/conversations";
import { setUnreadMessages } from "./store/utils/thunkCreators";

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
    // when receiving the message, if the message's senderId equals the activeConversation's id, we need to call setUnreadMessage
    const activeConversation = store.getState().activeConversation;
    const conversations = store.getState().conversations;
    // first make sure we have activated a chat
    if (activeConversation) {
      // get the id of the activeConversation, first find the conv
      const conv = conversations.find(
        (aConv) => aConv.otherUser.username === activeConversation
      );
      // currently the socket is broadcast, so we also need to check conversationId
      if (
        conv &&
        conv.otherUser.id === data.message.senderId &&
        conv.id === data.message.conversationId
      ) {
        store.dispatch(
          setUnreadMessages({
            activeConversation,
            unreadMessages: [data.message],
          })
        );
      }
    }
  });
  socket.on("unreadMessages", (data) => {
    store.dispatch(setMessageStatus(data));
  });
});

export default socket;
