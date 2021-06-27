const router = require("express").Router();
const { Op } = require("sequelize");
const { Conversation, Message, User } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    /*
      make sure the recipientId in the user table; (the receiverId != senderId)
    
      Because frontend need to check the value of the sender. 
      if sender is not null the frontend will add a new conversation,
      So sender && conversationId || !sender && !conversationId  return 400

      if sender is not null, check the id, it should equal to senderId.
    */
    const receiver = await User.findOne({
      where: {
        id: {
          [Op.and]: {
            [Op.eq]: recipientId,
            [Op.not]: senderId,
          },
        },
      },
    });
    if (
      !receiver ||
      (sender && conversationId) ||
      (!sender && !conversationId) ||
      (sender && sender.id !== senderId)
    ) {
      return res.sendStatus(400);
    }

    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (conversationId) {
      // check the conversationId, the conversationId should belong to the senderId and recipientId.
      if (conversationId !== conversation.id) {
        // if this conversationId doesn't belong to the user the status code should be 403 unauthorized
        return res.sendStatus(403);
      }

      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers[sender.id]) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
