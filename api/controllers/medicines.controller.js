var mongoose = require('mongoose');
var formularyData = mongoose.model('ModelName');


var _addMedicine = function (req, res, chapter) {
  
var listId = req.params.listId;
var subcategoryId = req.params.subcategoryId;
thisSubcategory = chapter.List.id(listId).Subcategories.id(subcategoryId);

thisSubcategory.MedicinesGroup.push({
    Name: req.body.Name
  });

  chapter.save(function(err, chapterUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(thisSubcategory.MedicinesGroup[thisSubcategory.MedicinesGroup.length - 1]);
    }
  });

};

module.exports.medicinesAddOne = function(req, res) {

  var chapterId = req.params.chapterId;
  var listId = req.params.listId;
  var subcategoryId = req.params.subcategoryId;
  

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
          thisSubcategory = chapter.List.id(listId).Subcategories.id(subcategoryId);

          if(!thisSubcategory){
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
        
        console.log("Getting to add the subcategory!!")
        _addMedicine(req, res, chapter);
 
    };  
})
}


   

