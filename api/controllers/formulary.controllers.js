var mongoose = require('mongoose');
var formularyData = mongoose.model('ModelName');

module.exports.chaptersGetAll = function(req, res){
    //console.log("Requested by" + user);
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