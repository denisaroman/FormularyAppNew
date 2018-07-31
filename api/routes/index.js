var express = require('express');
var router = express.Router();

var ctrlFormulary = require('../controllers/formulary.controllers.js');
var ctrlAdmin = require('../controllers/users.controllers.js');

router
    .route('/homepage')
    .get(ctrlFormulary.chaptersGetAll)
    .post(ctrlFormulary.chaptersAddOne);

router
    .route('/chapter/:chapterId')
    .get(ctrlFormulary.chaptersGetOne);
    //.post(ctrlFormulary.detailsAddOne);

//Authentication
router
    .route('/users/register')
    .post(ctrlAdmin.register);

router
    .route('/users/login')
    .post(ctrlAdmin.login);

module.exports = router;