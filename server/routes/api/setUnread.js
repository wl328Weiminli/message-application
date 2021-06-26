const router = require("express").Router();
const { Conversation, Message, User } = require("../../db/models");
const { Op } = require("sequelize");

// this api is for recipient to set their unread messages. the parameter is a Object { unreadMessages, activeConversation }
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { unreadMessages, activeConversation } = req.body;

    // make sure the message is belong to the user
    const recipientId = req.user.id;
    if (!activeConversation) {
      return res.sendStatus(400);
    }
    const sender = await User.findOne({
      where: {
        username: activeConversation,
      },
    });
    const conversation = await Conversation.findConversation(
      sender.id,
      recipientId
    );

    // get the corrent messages that user can set status
    const unReadMessagesId = [];
    unreadMessages.forEach((message) => {
      if (
        message.conversationId === conversation.id &&
        message.senderId !== recipientId
      ) {
        unReadMessagesId.push(message.id);
      }
    });

    await Message.update(
      {
        read: true,
      },
      {
        where: {
          id: {
            [Op.in]: unReadMessagesId,
          },
        },
      }
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
