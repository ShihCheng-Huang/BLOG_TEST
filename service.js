import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import uuid from 'uuid';
var config = require('./config');
var mongoose = require('mongoose');
var TextMode = require('./src/model/Text');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

let data = [
    {
      "Id":"1" ,
      "Title" : " TEST TITLE" ,
      "Text"  : " TTTTTTTEEEEEESSSSSSTTTT" ,
      "GoodPoint" : 0
    },
    {
      "Id":"2" ,
      "Title" : " TEST TITLE1" ,
      "Text"  : " TTTTTTTEEEEEESSSSSSTTTT1" ,
      "GoodPoint" : 0
    },
    {
      "Id":"3" ,
      "Title" : " TEST TITLE2" ,
      "Text"  : " TTTTTTTEEEEEESSSSSSTTTT2" ,
      "GoodPoint" : 0
    },
    {
      "Id":"4" ,
      "Title" : " TEST TITLE3" ,
      "Text"  : " TTTTTTTEEEEEESSSSSSTTTT3" ,
      "GoodPoint" : 0
    }
  ];
app.post('/api/home/getList', function(req, res, next) {
  var conditions = {};
  TextMode.find(conditions).sort("-GoodPoint")
  .exec(function(err, ele) {
    if (err) return next(err);
    res.send(ele);
  });

  //return res.send(data);

});

app.post('/api/home/sendGoodPoint', function(req, res, next) {
  let Id = req.body.ID;
 
  TextMode.findOne( { Id: Id }, function ( err, obj ){
    let GoodPoint = obj.GoodPoint ; 
    GoodPoint ++ ;
    console.log(obj.GoodPoint);
    obj.GoodPoint = GoodPoint ;
    obj.save(function(err) {
      if (err) return next(err);
      res.send("SUCCESS");
    });
  }); 
  //return res.send(data);

});

app.post('/api/create/createText', function(req, res, next) {
  let Title = req.body.Title;
  let Text = req.body.Text;
  try {
    var obj = new TextMode({
      Id: uuid.v1(),
      Title: Title,
      Text: Text,
      GoodPoint: 0,
    });
    
    obj.save(function(err) {
      if (err) return next(err);
      res.send("SUCCESS");
    });
  } catch (e) {
    res.status(404).send({ message: e });
  }
});

app.get('/*', (req, res) => {
  const context = {};
  

  const indexFile = path.resolve('./index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(data);
  });
});

mongoose.connect("mongodb://localhost:27017");
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});