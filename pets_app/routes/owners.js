const express = require('express');
const router = express.Router();
const { Owner } = require('../models');

router
  .route('')
  .get((req, res, next) => {
    return Owner.find().then(owners => {
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
      return Owner.findById(req.params.id).then(owner => {
        return res.render('owners/showOwner', { owner });
      }).catch(err => {
        return next(err);
      });
    }).catch(err => {
      return next(err);
    })
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


module.exports = router;



