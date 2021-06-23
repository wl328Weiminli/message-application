const router = require("express").Router();
const { Message } = require("../../db/models");

// frontend need to post the array of the unread message.
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
