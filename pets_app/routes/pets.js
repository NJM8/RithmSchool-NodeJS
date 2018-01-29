const express = require('express');
const router = express.Router({mergeParams: true});
const db = require('../models');


router
  .route('/')
  // GET   /owners/:ownerId/pets   Display all pets for an owner
  .get((req, res, next) => {
    return db.Owner.findById(req.params.owner_id).populate('pets').exec().then(owner => {
      return res.render('pets/index', { owner });
    }).catch(err => {
      return next(err);
    });
  })
  // POST  /owners/:ownerId/pets   Create a pet for an owner when a form is submitted
  .post((req, res, next) => {
    db.Pet.find({'name': req.body.name, 'owner': req.params.owner_id}).then(pet => {
      if (Object.keys(pet).length === 1) {
        return res.redirect(`/owners/${req.params.owner_id}/pets`);
      } else {
        let newPet = new db.Pet(req.body);
        let ownerId = req.params.owner_id;
        newPet.owner = ownerId;
        return newPet.save().then(pet => {
          return db.Owner.findByIdAndUpdate(ownerId, { $addToSet: { pets:pet.id } }).then(owner => {
              return res.redirect(`/owners/${owner.id}/pets`);
            }).catch(err => {
              return next(err);
            });
          }).catch(err => {
            return next(err);
          });
        }
    }).catch(err => {
      return next(err);
    })
  })
  // DELETE  /owners/:ownerId/pets/ Delete all pets from an owner
  .delete((req, res, next) => {
    return db.Owner.findById(req.params.owner_id).then(owner => {
      owner.pets.forEach(pet => {
        db.Pet.findByIdAndRemove(pet).catch(err => {
          return next(err);
        });
      });        
      owner.set({ pets: [] }).save(err => {
        return next(err);
      });
      return res.redirect(`/owners/${owner.id}/pets`); 
      }).catch(err => {
      return next(err);
    });
  });

router
  .route('/new')
  // GET   /owners/:ownerId/pets/new   Display a form for creating a new pet for an owner
  .get((req, res, next) => {
    return db.Owner.findById(req.params.owner_id).then(owner => {
      return res.render('pets/new', { owner });
    }).catch(err => {
      return next(err);
    });
  });

router
  .route('/:pet_id')
  // GET   /owners/:ownerId/pets/:petId  Display a single pet for an owner
  .get((req, res, next) => {
    return db.Pet.findById(req.params.pet_id).populate('owner').exec().then(pet => {
        return res.render('pets/show', { pet });
    }).catch(err => {
      return next(err);
    });
  })
  // PATCH   /owners/:ownerId/pets/:petId  Edit an owner's pet when a form is submitted
  .patch((req, res, next) => {
    return db.Pet.findByIdAndUpdate(req.params.pet_id, { $set: {name: req.body.name, species: req.body.species}}).then(pet => {
      return res.redirect(`/owners/${req.params.owner_id}/pets`);
    }).catch(err => {
      return next(err);
    });
  })
  // DELETE  /owners/:ownerId/pets/:petId  Delete an owner's pet when a form is submitted
  .delete((req, res, next) => {
    return db.Pet.findByIdAndRemove(req.params.pet_id).then(pet => {
      return db.Owner.findByIdAndUpdate(req.params.owner_id, { $pull:{ pets: req.params.pet_id } }).exec().then(pet => {
        return res.redirect(`/owners/${req.params.owner_id}/pets`);
        }).catch(err => {
        return next(err);
      });
    }).catch(err => {
      return next(err);
    });
  });


router
  .route('/:pet_id/edit')
  // GET   /owners/:ownerId/pets/:petId/edit   Display a form for editing an owner's pet
  .get((req, res, next) => {
    return db.Pet.findById(req.params.pet_id).populate('owner').exec().then(pet => {
      return res.render('pets/edit', { pet });
    }).catch(err => {
      return next(err);
    });
  });


module.exports = router;





