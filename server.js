var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  MongoClient = require('mongodb').MongoClient,
  url = "mongodb://localhost:27017/issuetracker";
app.get('/listIssues', function(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err; 
        db.collection("issues").find({}).toArray(function(err, data) {
            console.log(data);
            res.end(JSON.stringify(data));
            db.close();
        });
    });
});
app.get('/getIssue', function(req, res) {
    var query = req.query;
    var firstKey = Object.getOwnPropertyNames(query)[0];
    var firstValue = query[firstKey];
    console.log('Looking for: ' + firstKey + ': ' + firstValue);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err; 
        db.collection("issues").find(query).toArray(function(err, data) {
            console.log(data);
            res.end(JSON.stringify(data));
            db.close();
        });
    }); 
});
app.listen(port);

console.log('issue tracker RESTful API server started on: ' + port);