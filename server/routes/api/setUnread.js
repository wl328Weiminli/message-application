const router = require("express").Router();
const { Conversation, Message, User } = require("../../db/models");

// this api is for recipient to set their unread message. the parameter is a list of unread messages
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const unreadMessages = req.body;
    await Promise.all(
      unreadMessages.map((message) => {
        return Message.update({ read: true }, { where: { id: message.id } });
      })
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
