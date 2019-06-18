const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Movies = require('../models/movies')

const movieRouter = express.Router();

movieRouter.use(bodyParser.json());


movieRouter.route('/')
.get((req, res, next)=> {
    Movies.find({}).then(movies=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movies);
    }, err=> {
        next(err)
    }).catch(e=> {
        next(e)
    })
})
.post((req, res, next)=> {
    Movies.create(req.body).then(movie=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movie)
    }, err=> {
        console.log(err)
        next(err)
    }).catch((err)=> next(err))  

})

module.exports = movieRouter;
