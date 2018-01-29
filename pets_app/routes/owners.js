const express = require('express');
const router = express.Router();
const db = require('../models');



router
  .route('')
  // GET   /owners   List all owners
  .get((req, res, next) => {
    return db.Owner.find().then(owners => {
      return res.render('owners/index', { owners });
    }).catch(err => {
      return next(err);
    });
  })
  // POST  /owners   Create an owner when a form is submitted
  .post((req, res, next) => {
    return db.Owner.create(req.body).then(owner => {
      return res.redirect('/');
    }).catch(err => {
      return next(err);
    });
  });

router
  .route('/new')
  // GET   /owners/new   Display a form for creating a new owner
  .get((req, res, next) => {
    return res.render('owners/newOwner');
  });

router
  .route('/:owner_id')
  // GET   /owners/:id   Display a single owner
  .get((req, res, next) => {
    return db.Owner.findById(req.params.owner_id).then(owner => {
      return res.render('owners/showOwner', { owner });
    }).catch(err => {
      return next(err);
    });
  })
  // PATCH   /owners/:id   Edit an owner when a form is submitted
  .patch((req, res, next) => {
    return db.Owner.findByIdAndUpdate(req.params.owner_id, { $set: {name: req.body.name}}).then(owner => {
      return db.Owner.findById(req.params.owner_id).then(owner => {
        return res.render('owners/showOwner', { owner });
      }).catch(err => {
        return next(err);
      });
    }).catch(err => {
      return next(err);
    })
  })
  // DELETE  /owners/:id   Delete an owner when a form is submitted
  .delete((req, res, next) => {
    return db.Owner.findByIdAndRemove(req.params.owner_id).populate('pets').exec().then(owner => {
      // Be sure to remove all pets from DB owned by owner
      owner.pets.forEach(pet => {
        db.Pet.findByIdAndRemove(pet.id).catch(err => {
          return next(err);
        });
      });        
      return res.redirect('/'); 
      }).catch(err => {
      return next(err);
    });
  });

router
  .route('/:owner_id/edit')
  // GET   /owners/:id/edit  Display a form for editing a owner
  .get((req, res, next) => {
    return db.Owner.findById(req.params.owner_id).then(owner => {
      return res.render('owners/editOwner', { owner });
    }).catch(err => {
      return next(err);
    });
  })


module.exports = router;



