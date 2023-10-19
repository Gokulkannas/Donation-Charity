const express = require("express");
const router = express.Router()
const middleware = require("../middleware/index.js")
const admin = require("../Controller/admin_cloth_controller");

router.get("/adminclothprevious",admin.admin_navbar)
router.get("/adminclothdash",admin.admin_dash)
router.get("/adminclothdonate",admin.admin_donate)
router.get("/adminclothpending",admin.admin_pending)
router.get("/adminclothpendingaccept/:donationId",admin.pending_accept)
router.get("/adminclothreject/:donationId",admin.reject)
router.get("/adminclothacceptassignagent/:donationId",admin.accept_assign_agent)
router.get("/adminclothassisgningagent/:donationId",admin.assigning_agent)
router.post("/adminclothadminassisgningagent/:donationId",admin.post_assigning_agent)
router.get("/adminclothagentassigned/:donationId",admin.agent_assigned)
router.get("/adminclothprofile",admin.admin_profile)
router.get("/editclothadmin",admin.edit_admin)

module.exports = router;
