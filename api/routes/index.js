var express = require('express');
var router = express.Router();

var ctrlFormulary = require('../controllers/formulary.controllers.js');
var ctrlAdmin = require('../controllers/users.controllers.js');
var ctrlLists = require('../controllers/lists.controller.js');
var ctrlSubcategories = require('../controllers/subcategories.controller.js');
var ctrlMedicines = require('../controllers/medicines.controller');

router
    .route('/homepage')
    .get(ctrlFormulary.chaptersGetAll)
    .post(ctrlFormulary.chaptersAddOne);

router
    .route('/chapter/:chapterId')
    .get(ctrlFormulary.chaptersGetOne)
    .put(ctrlFormulary.chaptersUpdateOne)
    .delete(ctrlFormulary.chaptersDeleteOne);
    //.post(ctrlFormulary.detailsAddOne);

// Lists routes
router
  .route('/chapter/:chapterId/lists')
  .get(ctrlLists.listsGetAll)
  .post(ctrlLists.listsAddOne);

router
  .route('/chapter/:chapterId/lists/:listId')
  .get(ctrlLists.listsGetOne)
  .put(ctrlLists.listsUpdateOne)
  .delete(ctrlLists.listsDeleteOne)
  .post(ctrlSubcategories.subcategoriesAddOne);

router
  .route('/chapter/:chapterId/lists/:listId/:subcategoryId') 
  .post(ctrlMedicines.medicinesAddOne);

//Authentication
router
    .route('/users/register')
    .post(ctrlAdmin.register);

router
    .route('/users/login')
    .post(ctrlAdmin.login);

module.exports = router;