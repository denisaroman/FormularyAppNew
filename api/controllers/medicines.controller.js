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

module.exports.medicinesUpdateOne = function(req, res) {
  var chapterId = req.params.chapterId;
  var listId = req.params.listId;
  var subcategoryId = req.params.subcategoryId;
  var medicineGroupId = req.params.medicineGroupId;
  //console.log('PUT listId ' + listId + ' for chapterId ' + chapterId + "subcateg" + subcategoryId);
  
  formularyData
    .findById(chapterId)
    .select('List')
    .exec(function(err, chapter) {
      var thisMedicineGroup;
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
        thisMedicineGroup= chapter.List.id(listId).Subcategories.id(subcategoryId).MedicinesGroup.id(medicineGroupId);
        
        if (!thisMedicineGroup) {
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
        thisMedicineGroup.Name = req.body.Name; 
        console.log(thisMedicineGroup.Name);
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

module.exports.medicinesDeleteOne = function(req, res) {
var chapterId = req.params.chapterId;
var listId = req.params.listId;
var subcategoryId = req.params.subcategoryId;
var medicineGroupId = req.params.medicineGroupId;
//console.log('PUT listId ' + listId + ' for chapterId ' + chapterId);

formularyData
.findById(chapterId)
.select('List')
.exec(function(err, chapter) {
  var thisMedicineGroup;
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
    thisMedicineGroup= chapter.List.id(listId).Subcategories.id(subcategoryId).MedicinesGroup.id(medicineGroupId);
    // If the review doesn't exist Mongoose returns null
    if (!thisMedicineGroup) {
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
    thisMedicineGroup.remove();
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

   

