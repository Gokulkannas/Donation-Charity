const express = require("express")
const router = express.Router()
const middleware = require("../middleware/index.js");
const agent = require("../Controller/agent_controller")


router.get("/agentdash",middleware.ensureAgentLoggedIn,agent.agent_dash)
router.get("/agentpending",middleware.ensureAgentLoggedIn,agent.agent_pending)
router.get("/viewcollect/:collectionId",middleware.ensureAgentLoggedIn,agent.view_collect)
router.get("/accepttransport/:collectionId",middleware.ensureAgentLoggedIn,agent.assigning_transport)
router.post("/agentaccepttransport/:collectionId",middleware.ensureAgentLoggedIn,agent.post_assigning_agent)
router.get("/collection/:collectionId",middleware.ensureAgentLoggedIn,agent.collect)
router.get("/agentprevious",middleware.ensureAgentLoggedIn,agent.agent_previous)
router.get("/agentprofile",middleware.ensureAgentLoggedIn,agent.agent_profile)
router.get("/editagent",middleware.ensureAgentLoggedIn,agent.edit_agent)

module.exports = router;
