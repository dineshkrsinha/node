const express = require('express');
const bodyParser=require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    res.end('Will send all the leaders to you!');
})
.post((req, res, next) =>{
    res.end('Will add the leader:' + req.body.name + ' and details:' + req.body.description);
})
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('Put operation not supported on leaders');
})
.delete((req, res, next) =>{
    res.end('deleting all leaders');
});


leaderRouter.route('/:id')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    var id = req.params.id;
    res.end('Will send the leader  = ' + id + ' to you');
})
.post((req, res, next) =>{
    res.statusCode = 403;
    var id = req.params.id;
    res.end('Post not supported for leader  = ' + id);
})
.put((req, res, next) =>{
    var id = req.params.id;
    res.end('Will update the leader: ' + id + ' and details:' + req.body.description);
})
.delete((req, res, next) =>{
    var id = req.params.id;
    res.end('Will delete the leader: ' + id + ' and details:' + req.body.description);
});

module.exports = leaderRouter;