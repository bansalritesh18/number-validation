var Q = require("q");
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;
var db = undefined;

var host = "127.0.0.1";
var port = "27017";
var dbName = "hcl";

exports.connectToDatabase = function () {
  if (db) {
    var d = Q.defer();
    d.resolve(db);
    return d.promise;
  }
  var url = "mongodb://" + host + ":" + port + "/" + dbName;
  return connectToMongo(url).then(function (dbInstance) {
    db = dbInstance;
    return db;
  })
};

function connectToMongo(url) {
  var d = Q.defer();
  MongoClient.connect(url, function (err, db) {
    if (err) {
      d.reject(err);
      return;
    }
    d.resolve(db);

  });
  return d.promise;
}

exports.insertOne = function (table, insert) {
  var d = Q.defer();
  db.collection(table).insertOne(insert, function (err, result) {
    if (err) {
      d.reject(err);
      return;
    }
    insert._id = result.insertedId;
    d.resolve(insert);
  });
  return d.promise;
};

exports.updateOne = function (table, query, update, options) {
  options = options || {};
  options.w = 1;
  if (query._id) {
    query._id = ObjectId(query._id);
  }
  var d = Q.defer();
  db.collection(table).updateOne(query, update, options, function (err, result) {
    if (err) {
      d.reject(err);
      return;
    }
    d.resolve(result);
  });
  return d.promise;
};


exports.find = function (table, filter, options) {
  var d = Q.defer();
  filter = filter || {};
  if (filter._id) {
    filter._id = ObjectId(filter._id);
  }
  options = options || {};
  db.collection(table).find(filter, options).toArray(function (err, result) {
    if (err) {
      d.reject(err);
      return;
    }
    d.resolve(result);
  });
  return d.promise;
};

exports.remove = function (table, query, options) {
  options = options || {};
  options.w = 1;
  if (query._id) {
    query._id = ObjectId(query._id);
  }
  var d = Q.defer();
  db.collection(table).removeOne(query, options, function (err, result) {

    if (err) {
      d.reject(err);
      return;
    }
    d.resolve(result);
  });
  return d.promise;
};