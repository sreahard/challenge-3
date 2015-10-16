var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }))

var validAnimal = [];

function filterByTitle(obj) {
 if ('type' in obj && typeof(obj.type) === 'string') {
   validAnimal.push(obj);
   return true;
 } else {
   return false;
 }
};

router.route('/')

/* GET All Animals */
  .get(function(req, res) {
    mongoose.model('Animal').find({}, function(err, animals){
     if(err){
       return console.log(err);
     } else {
       var arrByTitle = animals.filter(filterByTitle);
       res.json(arrByTitle);
     }
   });
 })

.post(function(req, res){
   var type = req.body.type;
   var name = req.body.name;

   mongoose.model('Animal').create({
     type: type,
     name: name
   }, function(err, animal){
     if(err){
       res.send("That's not an animal")
     } else{
       console.log("New animal named " + animal + "created!");
       res.redirect('/index.html');
       res.send(animal);
     }
   });
 })

module.exports = router;

