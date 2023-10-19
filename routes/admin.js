const express = require("express");
const router = express.Router()
const middleware = require("../middleware/index.js")
const admin = require("../Controller/admin_controller");

router.get("/adminprevious",admin.admin_navbar)
router.get("/admindash",admin.admin_dash)
router.get("/admindonate",admin.admin_donate)
router.get("/adminpending",admin.admin_pending)
router.get("/adminpendingaccept/:donationId",admin.pending_accept)
router.get("/adminreject/:donationId",admin.reject)
router.get("/adminacceptassignagent/:donationId",admin.accept_assign_agent)
router.get("/adminassisgningagent/:donationId",admin.assigning_agent)
router.post("/adminadminassisgningagent/:donationId",admin.post_assigning_agent)
router.get("/adminagentassigned/:donationId",admin.agent_assigned)
router.get("/adminprofile",admin.admin_profile)
router.get("/editadmin",admin.edit_admin)

module.exports = router;
