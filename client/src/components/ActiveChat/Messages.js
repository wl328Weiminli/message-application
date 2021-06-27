import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import TypingIndicator from "./TypingIndicator";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, typing } = props;
  let lastSeenMessage = messages.reduce((lastSeenMessage, currMessage) => {
    if (currMessage.senderId === userId && currMessage.read) {
      return currMessage;
    }
    return lastSeenMessage;
  }, {});
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        let showAvatar = false;
        if (lastSeenMessage.id && message.id === lastSeenMessage.id) {
          showAvatar = true;
        }
        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            showAvatar={showAvatar}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
      {typing ? (
        <OtherUserBubble text={<TypingIndicator />} otherUser={otherUser} />
      ) : null}
    </Box>
  );
};

export default Messages;
