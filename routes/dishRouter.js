const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes')

const dishRouter = express.Router();
const dishCtrl = require('../controllers/dishcontroller')

dishRouter.use(bodyParser.json());



dishRouter.route('/')

    .get((req, res, next) => {
        Dishes.find({}).then((dishes) => {
            console.log(dishes)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);
        }, err => {
            console.log(err)
            next(err)
        }).catch((err) => next(err))
    })
    .post((req, res, next) => {
        //res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
        Dishes.create(req.body).then((dish) => {
            console.log(dish, 'created dish')
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish)
        }, err => {
            console.log(err, 'err');
            res.statusCode = 400;
            res.send(err.errmsg)
            //   next(err)
        }).catch((err) => {
            console.log(err, 'catch')
            next(err)
        })

    })
    .delete((req, res, next) => {
        // res.end('Deleting all dishes');
        Dishes.remove({}).then((resp) => {
            console.log(resp, 'resp dish')
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp)
        }, err => {
            console.log(err)
            next(err)
        }).catch((err) => next(err))


    });
dishRouter.
    put('/:dishId', dishCtrl.updateDishById)
    .get('/:dishId', dishCtrl.getDishesbyId)
    .delete('/:dishId', dishCtrl.deleteDishById)
    .post('/:dishId', (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId);
    })


dishRouter
    .get('/:dishId/comments', dishCtrl.getDishAllComments)
    .post('/:dishId/comments',dishCtrl.createCommentByDishId)
    .get('/:dishId/comments/:commentId', (req, res, next) => {
        //  res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
        Dishes.findById(req.params.dishId).then((dish) => {
            console.log(dish, "DIsh");

            console.log(dish.comments[0], 'selected dish')
            let selectedDishComments = dish.comments;
            if (dish != null) {
                res.setHeader('Content-Type', 'application/json');
                res.json(selectedDishComments.id(req.params.commentId));
                // selectedDishComments.findById(req.params.commentId).then((comment) => {
                //   if (comment != null) {
                //     res.statusCode = 200;
                //     res.setHeader('Content-Type', 'application/json');
                //     res.json(comment);
                //   } else {
                //     err = new Error('Dish' + req.params.commentId + 'Comment Not exists in db')
                //     err.statusCode = 404;
                //     return next(err)
                //   }

                // })
            } else {
                err = new Error('Dish' + req.params.dishId + 'Dish Not exists in db')
                err.statusCode = 404;
                return next(err)
            }

        }, err => {
            console.log(err)
            next(err)
        }).catch((err) => next(err))
    }).
    put('/:dishId/comments/:commentId', (req, res, next) => {

        Dishes.findById(req.params.dishId).then((dish) => {
            console.log(dish, "DIsh")
            if ((dish != null) && (dish.comments.id(req.params.commentId) != null)) {
                if (req.body.rating) {
                    dish.comments.id(req.params.commentId).rating = req.body.rating;
                }
                if (req.body.comment) {
                    dish.comments.id(req.params.commentId).comment = req.body.comment;
                }
                dish.save().then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                })
            } else if (dish == null) {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
            else {
                err = new Error('Comment ' + req.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, err => {
            console.log(err)
            next(err)
        }).catch((err) => next(err))
    })
    .delete('/:dishId/comments/:commentId', (req, res, next) => {
        Dishes.findById(req.params.dishId).then((dish) => {
            console.log(dish, "DIsh")
            if ((dish != null) && (dish.comments.id(req.params.commentId) != null)) {
                dish.comments.id(req.params.commentId).remove();
                dish.save()
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end('Deleting comment: ' + req.params.commentId);
                    }, (err) => next(err));


            } else {
                res.statusCode = 400;
                res.send(req.params.dishId + '' + " not exists in db");
            }

        }, err => {
            console.log(err)
            next(err)
        }).catch((err) => next(err))
    })
module.exports = dishRouter;