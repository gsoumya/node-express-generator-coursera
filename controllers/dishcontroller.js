const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes')

const dishRouter = express.Router();

module.exports = {
   getDishesbyId: function(req, res, next){
        //  res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
        Dishes.findById(req.params.dishId).then((dish) => {
            console.log(dish)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, err => {
            console.log(err)
            next(err)
        }).catch((err) => next(err))
    },
    deleteDishById: function (req, res, next) {
        Dishes.findById(req.params.dishId).then((dish) => {
            console.log(dish, 'dish delete');
            if (dish != null) {
                dish.remove();
                res.end('Deleting dish: ' + req.params.dishId);
            } else {
                res.statusCode = 400;
                res.send(req.params.dishId + ''+ "not exists in db");
            }
         
        }).catch((err)=> next(err))
    },
    getDishAllComments: function(req, res, next)  {
        //  res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
          Dishes.findById(req.params.dishId).then((dish) => {
              console.log(dish, "DIsh")
              if (dish != null) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(dish.comments);
              } else {
                  err = new Error('Dish' + req.params.dishId + 'Not exists in db')
                  err.statusCode = 404;
                  return next(err)
              }
  
          }, err => {
              console.log(err)
              next(err)
          }).catch((err) => next(err))
      },
      updateDishById: function(req, res, next)  {
        //  res.statusCode = 403;
        // res.end('PUT operation not supported on /dishes');
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true }).then((dish) => {
            console.log(dish, 'updated dish')
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish)
        }, err => {
            console.log(err)
            next(err)
        }).catch((err) => next(err))
    },
    createCommentByDishId: function (req, res, next) {
        Dishes.findById(req.params.dishId).then((dish) => {
            console.log(dish, "DIsh")
            if (dish != null) {

                dish.comments.push(req.body);
                dish.save().then(dish => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                }, err => {
                    next(err)
                })

            } else {
                err = new Error('Dish' + req.params.dishId + 'Not exists in db')
                err.statusCode = 404;
                return next(err)
            }
        });
    }


}