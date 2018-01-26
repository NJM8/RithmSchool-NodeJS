const express = require('express');
const router = express.Router({mergeParams: true});
const { Pet } = require('../models');

// GET   /owners/:ownerId/pets   Display all pets for an owner
// GET   /owners/:ownerId/pets/new   Display a form for creating a new pet for an owner
// GET   /owners/:ownerId/pets/:petId  Display a single pet for an owner
// GET   /owners/:ownerId/pets/:petId/edit   Display a form for editing an owner's pet
// POST  /owners/:ownerId/pets   Create a pet for an owner when a form is submitted
// PATCH   /owners/:ownerId/pets/:petId  Edit an owner's pet when a form is submitted
// DELETE  /owners/:ownerId/pets/:petId  Delete an owner's pet when a form is submitted

router
  .route('/owners/:id/pets')
  .get((req, res, next) => {
    return Owner.findById(req.params.id).populate('pets').exec().then(owner => {
          return res.render('pets/index', { owner });
        }).catch(err => {
          return next(err);
        });
  })
  .post((req, res, next) => {
    return Pet.create(req.body).then(pet => {
      return res.redirect('/');
    }).catch(err => {
      return next(err);
    });
  });

router
  .route('/new')
  .get((req, res, next) => {
    return res.render('pets/new');
  });

router
  .route('/:id')
  .get((req, res, next) => {
    return Pet.findById(req.params.id).then(pet => {
      return res.render('pets/show', { pet });
    }).catch(err => {
      return next(err);
    });
  })
  .patch((req, res, next) => {
    return Pet.findByIdAndUpdate(req.params.id, { $set: {name: req.body.name}}).then(pet => {
      return res.redirect('/');
    }).catch(err => {
      return next(err);
    });
  })
  .delete((req, res, next) => {
    return Pet.findByIdAndRemove(req.params.id).then(pet => {
      return res.redirect('/');
    }).catch(err => {
      return next(err);
    });
  });


router
  .route('/:id/edit')
  .get((req, res, next) => {
    return Pet.findById(req.params.id).then(pet => {
      return res.render('pets/edit', { pet });
    }).catch(err => {
      return next(err);
    });
  });


module.exports = router;

















