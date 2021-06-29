import { useState, useEffect } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import socket from "../../socket";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const { otherUser, conversationId, user, postMessage } = props;

  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    // currently the socket is boardcast, so we need check conversation id
    if (conversationId) {
      socket.emit("typing", {
        conversationId,
        id: otherUser.id,
        typing: true,
      });
      const delayDebounceFn = setTimeout(() => {
        socket.emit("typing", {
          conversationId,
          id: otherUser.id,
          typing: false,
        });
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [text]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : user,
    };
    await postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
