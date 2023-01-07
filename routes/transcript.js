const { Router } = require("express");
const controllers = require("../controllers/transcript");

const router = Router();

router.get("/", controllers.get);
router.post('/', controllers.create);

module.exports = router;