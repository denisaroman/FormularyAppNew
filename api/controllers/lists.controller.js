var mongoose = require('mongoose');
var formularyData = mongoose.model('ModelName');


// GET all lists for a chapter
module.exports.listsGetAll = function(req, res) {
  var chapterId = req.params.chapterId;
  console.log('GET lsits for chapterId', id);

  formularyData
    .findById(chapterId)
    .select('List')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : []
      };
      if (err) {
        console.log("Error finding chapter");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("Chapter id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Chapter ID not found " + id
        };
      } else {
        response.message = doc.List ? doc.List : [];
      }
      res
        .status(response.status)
        .json(response.message);
    });
};


module.exports.listsGetOne = function(req, res) {
  var chapterId = req.params.chapterId;
  var listId = req.params.listId;
  console.log('GET listId ' + listId + ' for chapterId ' + chapterId);

  formularyData
    .findById(chapterId)
    .select('List')
    .exec(function(err, chapter) {
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding chapter");
        response.status = 500;
        response.message = err;
      } else if(!chapter) {
        console.log("Chapter id not found in database", chapterId);
        response.status = 404;
        response.message = {
          "message" : "Chapter ID not found " + chapterId
        };
      } else {
        // Get the lsit
        response.message = chapter.List.id(listId);
        // If the list doesn't exist Mongoose returns null
        if (!response.message) {
          response.status = 404;
          response.message = {
            "message" : "List ID not found " + listId
          };
        }
      }
      res
        .status(response.status)
        .json(response.message);
    });

};

var _addList = function (req, res, chapter) {
  
  chapter.List.push({
    CategoryNumber: req.body.CategoryNumber,
    CategoryName: req.body.CategoryName
  });

  chapter.save(function(err, chapterUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(chapterUpdated.List[chapterUpdated.List.length - 1]);
    }
  });

};

module.exports.listsAddOne = function(req, res) {

  var id = req.params.chapterId;
  

  console.log('POST lsit to chapterId', id);

  formularyData
    .findById(id)
    .select('List')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding chapter");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("ChapterId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Chapter ID not found " + id
        };
      }
      if (doc) {
        console.log("Getting to add the list!!")
        _addList(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
  };

    module.exports.listsUpdateOne = function(req, res) {
      var chapterId = req.params.chapterId;
      var listId = req.params.listId;
      console.log('PUT listId ' + listId + ' for chapterId ' + chapterId);
      console.log(req.body.CategoryNumber);
      formularyData
        .findById(chapterId)
        .select('List')
        .exec(function(err, chapter) {
          var thisList;
          var response = {
            status : 200,
            message : {}
          };
          if (err) {
            console.log("Error finding chapter");
            response.status = 500;
            response.message = err;
          } else if(!chapter) {
            console.log("Chapter id not found in database", id);
            response.status = 404;
            response.message = {
              "message" : "Chapter ID not found " + id
            };
          } else {
            // Get the list
            thisList = chapter.List.id(listId);
            // If the list doesn't exist Mongoose returns null
            if (!thisList) {
              response.status = 404;
              response.message = {
                "message" : "List ID not found " + listId
              };
            }
          }
          if (response.status !== 200) {
            res
              .status(response.status)
              .json(response.message);
          } else {
            console.log(req.body.CategoryNumber);
            thisList.CategoryName = req.body.CategoryName; 
            thisList.CategoryNumber = req.body.CategoryNumber;
            chapter.save(function(err, chapterUpdated) {
              if (err) {
                res
                  .status(500)
                  .json(err);
              } else {
                res
                  .status(204)
                  .json();
              }
            });
          }
        });

};

module.exports.listsDeleteOne = function(req, res) {
  var chapterId = req.params.chapterId;
  var listId = req.params.listId;
  console.log('PUT listId ' + listId + ' for chapterId ' + chapterId);

  formularyData
    .findById(chapterId)
    .select('List')
    .exec(function(err, chapter) {
      var thisList;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding chapter");
        response.status = 500;
        response.message = err;
      } else if(!chapter) {
        console.log("Chapter id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Chapter ID not found " + id
        };
      } else {
        // Get the review
        thisList = chapter.List.id(listId);
        // If the review doesn't exist Mongoose returns null
        if (!thisList) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        chapter.List.id(listId).remove();
        chapter.save(function(err, chapterUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};