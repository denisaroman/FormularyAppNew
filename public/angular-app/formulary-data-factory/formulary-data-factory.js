angular.module('formularyapp').factory('formularyDataFactory', formularyDataFactory);

function formularyDataFactory($http) {
  return {
    chaptersList: chaptersList,
    chaptersDisplay: chaptersDisplay,
    chaptersUpdate: chaptersUpdate,
    chaptersDelete: chaptersDelete,
    postLists: postLists,
    categoryUpdate: categoryUpdate,
    categoryDelete: categoryDelete,
    postSubcategories: postSubcategories
  };

  function chaptersList() {
    return $http.get('/api/homepage').then(complete).catch(failed);
  }

  function chaptersDisplay(id) {
    return $http.get('/api/chapter/' + id).then(complete).catch(failed);
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

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}