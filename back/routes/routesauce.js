const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const sauceCtrl = require("../controllers/controllerssauce");

router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, sauceCtrl.createSauce);
router.put("/:id", auth, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.delete);
router.post("/:id/like", auth, sauceCtrl.likeAndDislike);

module.exports = router;
