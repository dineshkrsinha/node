const express = require('express');
const bodyParser=require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) =>{
    res.end('Will add the dish:' + req.body.name + ' and details:' + req.body.description);
})
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('Put operation not supported on dishes');
})
.delete((req, res, next) =>{
    res.end('deleting all dishes');
});


dishRouter.route('/:id')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    var id = req.params.id;
    res.end('Will send the dish  = ' + id + ' to you');
})
.post((req, res, next) =>{
    res.statusCode = 403;
    var id = req.params.id;
    res.end('Post not supported for dish  = ' + id);
})
.put((req, res, next) =>{
    var id = req.params.id;
    res.end('Will update the dish: ' + id + ' and details:' + req.body.description);
})
.delete((req, res, next) =>{
    var id = req.params.id;
    res.end('Will delete the dish: ' + id + ' and details:' + req.body.description);
});

module.exports = dishRouter;