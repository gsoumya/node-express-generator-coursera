const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Facility = require('../models/facilities')

const facilityRouter = express.Router();

facilityRouter.use(bodyParser.json());


facilityRouter.route('/')
.get((req,res,next) => {
    Facility.find({}).then((facilityes)=> {
        console.log(facilityes)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(facilityes);
    }, err=> {
        console.log(err)
        next(err)
    }).catch((err)=> next(err))   
  })
  .post((req, res, next) => {
      //res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
      Facility.create(req.body).then((facility)=> {
          console.log(facility, 'created facility')
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(facility)
      }, err=> {
          console.log(err)
          next(err)
      }).catch((err)=> next(err))  
  
  })
  module.exports = facilityRouter;