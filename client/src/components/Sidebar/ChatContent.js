import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadPreview: {
    fontSize: 12,
    letterSpacing: -0.17,
    fontWeight: "bold",
  },
  notification: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, unreadMessages } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            unreadMessages > 0 ? classes.unreadPreview : classes.previewText
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
      <Box className={classes.notification}>
        <Badge badgeContent={unreadMessages} color="primary" max={100} />
      </Box>
    </Box>
  );
};

export default ChatContent;
