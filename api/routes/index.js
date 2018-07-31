var express = require('express');
var router = express.Router();

var ctrlFormulary = require('../controllers/formulary.controllers.js');


router
    .route('/homepage')
    .get(ctrlFormulary.chaptersGetAll)
    .post(ctrlFormulary.chaptersAddOne);

router
    .route('/chapter/:chapterId')
    .get(ctrlFormulary.chaptersGetOne);
    //.post(ctrlFormulary.detailsAddOne);

module.exports = router;