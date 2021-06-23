const router = require("express").Router();
const { Conversation, Message, User } = require("../../db/models");

// this api is for recipient to set their unread message. the parameter is a list of unread messages
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const unreadMessage = req.body;
    await Promise.all(
      unreadMessage.map((message) => {
        return Message.update(
          { readOrNot: true },
          { where: { id: message.id } }
        );
      })
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
