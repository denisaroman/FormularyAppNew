var mongoose = require('mongoose');
var formularyData = mongoose.model('ModelName');

module.exports.chaptersGetAll = function(req, res){
    console.log('Requested by: ' + req.user);
    
    var offset = 0;
    var count = 50;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    formularyData
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, myCollection) {
        console.log("Found chapters", myCollection.length);
        res
            //.status(200)
            .json(myCollection);
    });
};

module.exports.chaptersGetOne = function(req, res) {
    var chapterId = req.params.chapterId;
    console.log('GET the chapter', chapterId);
    
    formularyData
      .findById(chapterId)
      .exec(function(err,docs){
        res
        .status(200)
        .json(docs);
      });
  };

  module.exports.chaptersAddOne = function(req, res) {
    console.log("POST new chapter");
  
    formularyData
      .create({
        Number: req.body.Number,
        Chapter: req.body.Chapter,
        List: [
          {
            CategoryNumber: req.body.CategoryNumber,
            CategoryName: req.body.CategoryName,
            Subcategories:[
              {
                Title: req.body.Title,
                MedicinesGroup:[
                  {
                    Name: req.body.Name,
                    Content:[
                      {
                        Substance: req.body.Substance,
                        Details:[
                          {
                            Brand : req.body.Brand,
                            Note : req.body.Note,
                            Link : req.body.Link,
                            Color: req.body.Color
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
            
          }  
        ]
      }, function(err, chapter) {
        if (err) {
          console.log("Error creating chapter");
          res
            .status(400)
            .json(err);
        } else {
          console.log("Chapter created!", chapter);
          res
            .status(201)
            .json(chapter);
        }
      });
  
  };

  //updateOne
  module.exports.chaptersUpdateOne = function(req, res) {
    var chapterId = req.params.chapterId;
  
    console.log('GET chapterId', chapterId);
  
    formularyData
      .findById(chapterId)
      .select('-List')
      .exec(function(err, chapter) {
        /*if (err) {
          console.log("Error finding chapter");
          res
            .status(500)
            .json(err);
            return;
        } else if(!chapter) {
          console.log("ChapterId not found in database", chapterId);
          res
            .status(404)
            .lson({
              "message" : "Chapter ID not found " + chapterId
            });
            return;
        }*/
  
        chapter.Number = req.body.Number;
        chapter.Chapter = req.body.Chapter;
        console.log(req.body.Number + req.body.Chapter);
        
        chapter
          .save(function(err, chapterUpdated) {
            if(err) {
              res
                .status(500)
                .json(err);
            } else {
              res
                .status(204)
                .json(chapter);
            }
          });
  
  
      });
  
  };

  module.exports.chaptersDeleteOne = function(req, res) {
    var chapterId = req.params.chapterId;
  
    formularyData
      .findByIdAndRemove(chapterId)
      .exec(function(err, location) {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          console.log("Chapter deleted, id:", chapterId);
          res
            .status(204)
            .json();        
        }
      });
  };