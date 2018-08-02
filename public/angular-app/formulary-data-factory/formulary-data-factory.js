angular.module('formularyapp').factory('formularyDataFactory', formularyDataFactory);

function formularyDataFactory($http) {
  return {
    chaptersList: chaptersList,
    chaptersDisplay: chaptersDisplay,
    postLists: postLists
  };

  function chaptersList() {
    return $http.get('/api/homepage').then(complete).catch(failed);
  }

  function chaptersDisplay(id) {
    return $http.get('/api/chapter/' + id).then(complete).catch(failed);
  }

  function postLists(id, lists) {
    return $http.post('/api/chapter/' + id + '/lists', lists).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}