var mongoose = require('mongoose');
var formularyData = mongoose.model('ModelName');


var _addBrand = function (req, res, chapter) {
  
var listId = req.params.listId;
var subcategoryId = req.params.subcategoryId;
var medicineGroupId = req.params.medicineGroupId;
var substanceId = req.params.substanceId;
thisSubstance= chapter.List.id(listId).Subcategories.id(subcategoryId).MedicinesGroup.id(medicineGroupId).Content.id(substanceId);

thisSubstance.Details.push({
    Brand: req.body.Brand,
    Note: req.body.Note,
    Link: req.body.Link,
    Color: req.body.Color
  });

  chapter.save(function(err, chapterUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(thisSubstance.Details[thisSubstance.Details.length - 1]);
    }
  });

};

module.exports.brandAddOne = function(req, res) {

  var chapterId = req.params.chapterId;
  var listId = req.params.listId;
  var subcategoryId = req.params.subcategoryId;
  var medicineGroupId = req.params.medicineGroupId;
  var substanceId=req.params.substanceId;

  //console.log('POST subcategory to listId', listId);

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
        console.log("ChapterId not found in database", chapterI);
        response.status = 404;
        response.message = {
          "message" : "Chapter ID not found " + chapterId
        };
      } else {
          //Get the list
          thisSubstance= chapter.List.id(listId).Subcategories.id(subcategoryId).MedicinesGroup.id(medicineGroupId).Content.id(substanceId);

          if(!thisSubstance){
              response.status=404;
              response.message={
                  "message" : "ListId not found" + listId
              };
          }
      }
      if (response.status!==200) {
        res
        .status(response.status)
        .json(response.message);
    } else {
        console.log("Add the substance");
        _addBrand(req, res, chapter);
 
    };  
})
}

module.exports.brandsUpdateOne = function(req, res) {
  var chapterId = req.params.chapterId;
  var listId = req.params.listId;
  var subcategoryId = req.params.subcategoryId;
  var medicineGroupId = req.params.medicineGroupId;
  var substanceId = req.params.substanceId;
  var detailsId = req.params.detailsId;
  //console.log('PUT listId ' + listId + ' for chapterId ' + chapterId + "subcateg" + subcategoryId);
  
  formularyData
    .findById(chapterId)
    .select('List')
    .exec(function(err, chapter) {
      var thisBrand;
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
        thisBrand= chapter.List.id(listId).Subcategories.id(subcategoryId).MedicinesGroup.id(medicineGroupId).Content.id(substanceId).Details.id(detailsId);
        
        if (!thisBrand) {
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
        thisBrand.Brand = req.body.Brand;
        thisBrand.Note = req.body.Note;
        thisBrand.Link = req.body.Link;
        thisBrand.Color = req.body.Color; 
        
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

module.exports.brandsDeleteOne = function(req, res) {
var chapterId = req.params.chapterId;
var listId = req.params.listId;
var subcategoryId = req.params.subcategoryId;
var medicineGroupId = req.params.medicineGroupId;
var substanceId = req.params.substanceId;
var detailsId = req.params.detailsId;
//console.log('PUT listId ' + listId + ' for chapterId ' + chapterId);

formularyData
.findById(chapterId)
.select('List')
.exec(function(err, chapter) {
  var thisBrand;
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
    thisBrand= chapter.List.id(listId).Subcategories.id(subcategoryId).MedicinesGroup.id(medicineGroupId).Content.id(substanceId).Details.id(detailsId);
    // If the review doesn't exist Mongoose returns null
    if (!thisBrand) {
      response.status = 404;
      response.message = {
        "message" : "Review ID not found " 
      };
    }
  }
  if (response.status !== 200) {
    res
      .status(response.status)
      .json(response.message);
  } else {
    thisBrand.remove();
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


   

