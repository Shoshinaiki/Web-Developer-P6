const express = require("express");
const router = express.Router();

const sauceCtrl = require("../controllers/controllerssauce");

router.get("/", sauceCtrl.getAllSauce);
router.get("/:id", sauceCtrl.getOneSauce);
router.post("/", sauceCtrl.createSauce);
router.put("/:id", sauceCtrl.updateSauce);
router.delete("/:id", sauceCtrl.delete);
router.post("/:id/like", sauceCtrl.likeAndDislike);

module.exports = router;
