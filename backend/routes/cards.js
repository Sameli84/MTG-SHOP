const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
  createCard,
  deleteCard,
  getCards,
  getCardById,
} = require("../controllers/cards");

router.get("/", getCards);
router.get("/:id", getCardById);

router.use(verifyToken);

router.post("/", createCard);
router.delete("/:id", deleteCard);

module.exports = router;
