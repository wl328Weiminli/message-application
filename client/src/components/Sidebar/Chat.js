import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { setUnreadMessages } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

class Chat extends Component {
  handleClick = async (conversation, unreadMessages) => {
    const { username } = conversation.otherUser;
    await this.props.setActiveChat(username);

    if (unreadMessages.length > 0) {
      await this.props.setUnreadMessages({
        activeConversation: username,
        unreadMessages,
      });
    }
  };

  render() {
    const { classes, conversation } = this.props;
    const otherUser = this.props.conversation.otherUser;
    // filter the unread message, the unread status is only for receiver
    const unreadMessages = conversation.messages.filter(
      (amessage) => otherUser.id === amessage.senderId && !amessage.read
    );
    return (
      <Box
        onClick={() => this.handleClick(conversation, unreadMessages)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent
          conversation={conversation}
          unreadMessages={unreadMessages.length}
        />
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    setUnreadMessages: (messageStatus) => {
      dispatch(setUnreadMessages(messageStatus));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
