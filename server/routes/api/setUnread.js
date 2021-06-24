const router = require("express").Router();
const { Message } = require("../../db/models");
const { Op } = require("sequelize");

// this api is for recipient to set their unread message. the parameter is a list of unread messages
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const unreadMessages = req.body;
    await Message.update(
      {
        read: true,
      },
      {
        where: {
          id: {
            [Op.in]: unreadMessages.map((message) => message.id),
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
