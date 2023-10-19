const express = require("express")
const router = express.Router()
const middleware = require("../middleware/index.js")
const cloth = require("../Controller/cloth_controller");

router.get("/clothprevious",middleware.ensureDonorLoggedIn,cloth.donar_navbar)
router.get("/clothdash",middleware.ensureDonorLoggedIn,cloth.donar_dash)
router.get("/clothdonate",middleware.ensureDonorLoggedIn,cloth.donar_donate)
router.post("/clothdonate",middleware.ensureDonorLoggedIn,cloth.post_donate)
router.get("/clothpending",middleware.ensureDonorLoggedIn,cloth.donar_pending)
router.get("/clothdonarprofile",middleware.ensureDonorLoggedIn,cloth.donar_profile)
router.get("/clothditdonors",middleware.ensureDonorLoggedIn,cloth.edit_donor)
router.put("/clothditdonors",middleware.ensureDonorLoggedIn,cloth.update_donor)

module.exports = router;
