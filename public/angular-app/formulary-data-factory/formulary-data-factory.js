angular.module('formularyapp').factory('formularyDataFactory', formularyDataFactory);

function formularyDataFactory($http) {
  return {
    chaptersList: chaptersList,
    chaptersDisplay: chaptersDisplay,
    listDisplay:listDisplay,
    chaptersUpdate: chaptersUpdate,
    chaptersDelete: chaptersDelete,
    postLists: postLists,
    categoryUpdate: categoryUpdate,
    categoryDelete: categoryDelete,
    postSubcategories: postSubcategories,
    subcategoryUpdate: subcategoryUpdate,
    subcategoryDelete: subcategoryDelete,
    postMedicines: postMedicines,
    medicineGroupUpdate: medicineGroupUpdate,
    medicineGroupDelete: medicineGroupDelete,
    postSubstances: postSubstances,
    substanceUpdate: substanceUpdate,
    substanceDelete: substanceDelete,
    postBrand: postBrand,
    detailsUpdate: detailsUpdate,
    detailsDelete: detailsDelete
  };

  function chaptersList() {
    return $http.get('/api/homepage').then(complete).catch(failed);
  }

  function chaptersDisplay(id) {
    return $http.get('/api/chapter/' + id).then(complete).catch(failed);
  }

  function listDisplay(chapterId, listId){
    return $http.get('/api/chapter/'+chapterId+'/lists/'+listId).then(complete).catch(failed);
  }

  function chaptersUpdate(id, chapter){
    return $http.put('/api/chapter/' + id, chapter).then(complete).catch(failed);
  }

  function chaptersDelete(id){
    return $http.delete('/api/chapter/' + id).then(complete).catch(failed);
  }

  function categoryUpdate(chapterId, listId, list) {
    return $http.put('/api/chapter/' + chapterId + '/lists/' + listId, list).then(complete).catch(failed);
  }

  function categoryDelete(chapterId, listId) {
    return $http.delete('/api/chapter/' + chapterId + '/lists/' + listId).then(complete).catch(failed);
  }

  function postLists(id, lists) {
    return $http.post('/api/chapter/' + id + '/lists', lists).then(complete).catch(failed);
  }
  function postSubcategories(chapterId, listId, subcategories) {
    return $http.post('/api/chapter/' + chapterId + '/lists/'+ listId, subcategories).then(complete).catch(failed);
  }

  function subcategoryUpdate(chapterId, listId, subcategoryId, subcategories) {
    return $http.put('/api/chapter/' + chapterId + '/lists/' + listId + '/' + subcategoryId, subcategories).then(complete).catch(failed);
  }

  function subcategoryDelete(chapterId, listId, subcategoryId) {
    return $http.delete('/api/chapter/' + chapterId + '/lists/' + listId + '/' + subcategoryId).then(complete).catch(failed);
  }

  function postMedicines(chapterId, listId, subcategoryId, medicines) {
    return $http.post('/api/chapter/' + chapterId + '/lists/'+ listId +'/'+ subcategoryId, medicines).then(complete).catch(failed);
  }

  function medicineGroupUpdate(chapterId, listId, subcategoryId, medicineGroupId, medicines) {
    return $http.put('/api/chapter/' + chapterId + '/lists/' + listId + '/' + subcategoryId + '/' +medicineGroupId, medicines).then(complete).catch(failed);
  }

  function medicineGroupDelete(chapterId, listId, subcategoryId, medicineGroupId) {
    return $http.delete('/api/chapter/' + chapterId + '/lists/' + listId + '/' + subcategoryId + '/' +medicineGroupId).then(complete).catch(failed);
  }

  function postSubstances(chapterId, listId, subcategoryId, medicineGroupId, substances) {
    return $http.post('/api/chapter/' + chapterId + '/lists/'+ listId +'/'+ subcategoryId + '/' + medicineGroupId, substances).then(complete).catch(failed);
  }

  function substanceUpdate(chapterId, listId, subcategoryId, medicineGroupId, substanceId, medicines) {
    return $http.put('/api/chapter/' + chapterId + '/lists/' + listId + '/' + subcategoryId + '/' +medicineGroupId + '/' + substanceId, medicines).then(complete).catch(failed);
  }

  function substanceDelete(chapterId, listId, subcategoryId, medicineGroupId, substanceId) {
    return $http.delete('/api/chapter/' + chapterId + '/lists/' + listId + '/' + subcategoryId + '/' +medicineGroupId + '/' + substanceId).then(complete).catch(failed);
  }

  function postBrand(chapterId, listId, subcategoryId, medicineGroupId, substanceId, brand) {
    return $http.post('/api/chapter/' + chapterId + '/lists/'+ listId +'/'+ subcategoryId + '/' + medicineGroupId +'/' + substanceId, brand).then(complete).catch(failed);
  }

  function detailsUpdate(chapterId, listId, subcategoryId, medicineGroupId, substanceId, detailsId, details) {
    return $http.put('/api/chapter/' + chapterId + '/lists/' + listId + '/' + subcategoryId + '/' +medicineGroupId + '/' + substanceId + '/' + detailsId, details).then(complete).catch(failed);
  }

  function detailsDelete(chapterId, listId, subcategoryId, medicineGroupId, substanceId, detailsId) {
    return $http.delete('/api/chapter/' + chapterId + '/lists/' + listId + '/' + subcategoryId + '/' +medicineGroupId + '/' + substanceId + '/' + detailsId).then(complete).catch(failed);
  }



  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}