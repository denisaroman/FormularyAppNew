var express = require('express');
var router = express.Router();

var ctrlFormulary = require('../controllers/formulary.controllers.js');
var ctrlAdmin = require('../controllers/users.controllers.js');
var ctrlLists = require('../controllers/lists.controller.js');
var ctrlSubcategories = require('../controllers/subcategories.controller.js');
var ctrlMedicines = require('../controllers/medicines.controller');
var ctrlSubstances = require('../controllers/substances.controller');
var ctrlBrand = require('../controllers/brand.controller');

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
  .post(ctrlMedicines.medicinesAddOne)
  .put(ctrlSubcategories.subcategoriesUpdateOne)
  .delete(ctrlSubcategories.subcategoriesDeleteOne);

router
    .route('/chapter/:chapterId/lists/:listId/:subcategoryId/:medicineGroupId')
    .post(ctrlSubstances.substancesAddOne)
    .put(ctrlMedicines.medicinesUpdateOne)
    .delete(ctrlMedicines.medicinesDeleteOne);

router
    .route('/chapter/:chapterId/lists/:listId/:subcategoryId/:medicineGroupId/:substanceId')
    .post(ctrlBrand.brandAddOne)
    .put(ctrlSubstances.substancesUpdateOne)
    .delete(ctrlSubstances.substancesDeleteOne);

router
    .route('/chapter/:chapterId/lists/:listId/:subcategoryId/:medicineGroupId/:substanceId/:detailsId')
    .put(ctrlBrand.brandsUpdateOne)
    .delete(ctrlBrand.brandsDeleteOne);

//Authentication
router
    .route('/users/register')
    .post(ctrlAdmin.register);

router
    .route('/users/login')
    .post(ctrlAdmin.login);

module.exports = router;