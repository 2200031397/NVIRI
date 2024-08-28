const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

router.get('/locations', controller.getLocations);
router.get('/appliances', controller.getApplianceSuggestions);
router.get('/featured-technicians', controller.getFeaturedTechnicians);
router.post('/technician-login', controller.loginTechnician);
router.post('/login', controller.loginUser);

module.exports = router;
