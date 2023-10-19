const express = require("express")
const router = express.Router()
const middleware = require("../middleware/index.js")
const donor = require("../Controller/donor_controller");

router.get("/previous",middleware.ensureDonorLoggedIn,donor.donar_navbar)
router.get("/dash",middleware.ensureDonorLoggedIn,donor.donar_dash)
router.get("/donate",middleware.ensureDonorLoggedIn,donor.donar_donate)
router.post("/donate",middleware.ensureDonorLoggedIn,donor.post_donate)
router.get("/pending",middleware.ensureDonorLoggedIn,donor.donar_pending)
router.get("/donarprofile",middleware.ensureDonorLoggedIn,donor.donar_profile)
router.get("/editdonors",middleware.ensureDonorLoggedIn,donor.edit_donor)
router.put("/editdonors",middleware.ensureDonorLoggedIn,donor.update_donor)

module.exports = router;
