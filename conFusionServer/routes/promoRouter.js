const express = require('express');
const bodyParser=require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    res.end('Will send all the promotions to you!');
})
.post((req, res, next) =>{
    res.end('Will add the promotion:' + req.body.name + ' and details:' + req.body.description);
})
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('Put operation not supported on promotions');
})
.delete((req, res, next) =>{
    res.end('deleting all promotions');
});


promoRouter.route('/:id')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    var id = req.params.id;
    res.end('Will send the promotion  = ' + id + ' to you');
})
.post((req, res, next) =>{
    res.statusCode = 403;
    var id = req.params.id;
    res.end('Post not supported for promotion  = ' + id);
})
.put((req, res, next) =>{
    var id = req.params.id;
    res.end('Will update the promotion: ' + id + ' and details:' + req.body.description);
})
.delete((req, res, next) =>{
    var id = req.params.id;
    res.end('Will delete the promotion: ' + id + ' and details:' + req.body.description);
});

module.exports = promoRouter;