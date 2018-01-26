const express = require('express');
const { Owner } = require('../models');
const router = express.Router({mergeParams: true});


router
  .route('')
  .get((req, res, next) => {
    return Owner.find().then()(owners => {
      return res.render('owners/index', { owners });
    }).catch(err => {
      return next(err);
    });
  })
  .post((req, res, next) => {
    return Owner.create(req.body).then(owner => {
      return res.redirect('/');
    }).catch(err => {
      return next(err);
    });
  });

router
  .route('/new')
  .get((req, res, next) => {
    return res.render('owners/newOwner');
  });

router
  .route('/:id')
  .get((req, res, next) => {
    return Owner.findById(req.params.id).then(owner => {
      return res.render('owners/showOwner', { owner });
    }).catch(err => {
      return next(err);
    });
  })
  .patch((req, res, next) => {
    return Owner.findByIdAndUpdate(req.params.id, { $set: {name: req.body.name}}).then(owner => {
      return res.redirect('/');
    }).catch(err => {
      return next(err);
    });
  })
  .delete((req, res, next) => {
    return Owner.findByIdAndRemove(req.params.id).then(owner => {
      return res.redirect('/');
    }).catch(err => {
      return next(err);
    });
  })

router
  .route('/:id/edit')
  .get((req, res, next) => {
    return Owner.findById(req.params.id).then(owner => {
      return res.render('owners/editOwner', { owner });
    }).catch(err => {
      return next(err);
    });
  })


// done GET   /owners   List all owners
// done GET   /owners/new   Display a form for creating a new owner
// done GET   /owners/:id   Display a single owner
// done GET   /owners/:id/edit  Display a form for editing a owner
// done POST  /owners   Create an owner when a form is submitted
// done PATCH   /owners/:id   Edit an owner when a form is submitted
// done DELETE  /owners/:id   Delete an owner when a form is submitted
// SEARCH /owners/search Search for an owner, display if found
// DELETE /owners Delete all owners


module.exports = router;



