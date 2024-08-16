//create web server
//create a new web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
//parse the request body
app.use(bodyParser.json());
//read the comments.json file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
//add a new comment
app.post('/comments', function (req, res) {
    var newComment = req.body;
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(newComment);
});
//return all comments
app.get('/comments', function (req, res) {
    res.json(comments);
});
//return a single comment
app.get('/comments/:id', function (req, res) {
    var id = req.params.id;
    res.json(comments[id]);
});
//update a comment
app.put('/comments/:id', function (req, res) {
    var id = req.params.id;
    comments[id] = req.body;
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(comments[id]);
});
//delete a comment
app.delete('/comments/:id', function (req, res) {
    var id = req.params.id;
    comments.splice(id, 1);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(true);
});
//start the server
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000/');
});
//run the server
//node comments.js
//test the server
//curl -H "Content-Type: application/json" -X POST -d '{"name": "Joe", "comment": "Hello"}' http://localhost:3000/comments
//curl http://localhost:3000/comments
//curl http://localhost:3000/comments/0
//curl -H "Content-Type: application/json" -X PUT -d '{"name": "Joe", "comment": "Hello, World!"}' http://localhost:3000/comments/0
//curl -X DELETE http://localhost:3000/comments/0
//curl http://localhost:3000/comments

