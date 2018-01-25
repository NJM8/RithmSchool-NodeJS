const express = require('express');
const { Item } = require('../models');
const router = express.Router();


router
	.route('')
	.get((req, res, next) => {
		return Item.find().then(items => {
			return res.render('items', {items});	
		}).catch(err => {
      return next(err);
    });
	})
	.post((req, res, next) => {
		return Item.create(req.body).then(item => {
			return res.redirect('/items');
		}).catch(err => {
      return next(err);
    });
	})
	.delete((req, res, next) => {
		return Item.remove().then(() => {
			return res.redirect('/items');
		}).catch(err => {
      return next(err);
    });
	})

router.route('/new').get((req, res, next) => {
	return res.render('add-item');
});

router
	.route('/search')
	.get((req, res, next) => {
		res.render('search');
	})
	.post((req, res, next) => {
		return Item.findOne({'name': req.body.name}).then(item => {
			console.log(item);
			if (item) {
				return res.redirect(`/items/${item.id}/edit`);
			} else {
				return res.redirect('/items');
			}
		}).catch(err => {
      return next(err);
    });
	});

router
	.route('/:id')
	.get((req, res, next) => {
		return Item.findById(req.params.id).then(item => {
			return res.render('items', {item});
		}).catch(err => {
      return next(err);
    });
	})
	.patch((req, res, next) => {
		return Item.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, quantity: req.body.quantity}}).then(item => {
			return res.redirect('/items');
		}).catch(err => {
			return next(err);
		});
	})
	.delete((req, res, next) => {
		return Item.findByIdAndRemove(req.params.id).then(item => {
			return res.redirect('/items');
		}).catch(err => {
			return next(err);
		});
	})

router.route('/:id/edit').get((req, res, next) => {
		return Item.findById(req.params.id).then(item => {
			return res.render('edit', {item});
		}).catch(err => {
			return next(err);
		});
	});

module.exports = router;










