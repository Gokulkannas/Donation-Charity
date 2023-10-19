const express = require("express")
const router = express.Router()
const middleware = require("../middleware/index.js");
const  transport = require("../Controller/transport_controller")


router.get("/transportdash",middleware.ensureTransportLoggedIn,transport.agent_dash)
router.get("/transportpending",middleware.ensureTransportLoggedIn,transport.agent_pending)
router.get("/transviewcollect/:collectionId",middleware.ensureTransportLoggedIn,transport.view_collect)
router.get("/transcollection/:collectionId",middleware.ensureTransportLoggedIn,transport.collect)
router.get("/transportprevious",middleware.ensureTransportLoggedIn,transport.agent_previous)
router.get("/transportprofile",middleware.ensureTransportLoggedIn,transport.agent_profile)
router.get("/transporteditagent",middleware.ensureTransportLoggedIn,transport.edit_agent)

module.exports = router;
