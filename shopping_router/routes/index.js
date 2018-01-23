const express = require('express');

const router = express.Router();

const items = [];
let id = 1;

router
	.route('')
	.get((req, res, next) => {
		return res.render('items', {items});
	})
	.post((req, res, next) => {
		items.push({
			name: req.body.item,
			price: req.body.price, 
			id: ++id
		});
		return res.redirect('/items');
	})

router.route('/new').get((req, res, next) => {
	return res.render('add-item');
});

router
	.route('/:id')
	.get((req, res, next) => {
		const item = items.find(val => val.id === Number(req.params.id));
		res.render('items', {item});
	})
	.patch((req, res, next) => {
		const item = items.find(val => val.id === Number(req.params.id));
		item.name = req.body.item;
		item.price = req.body.price;
		return res.redirect('/items');
	})
	.delete((req, res, next) => {
		const itemIndex = items.findIndex(val => val.id === Number(req.params.id));
		items.splice(itemIndex, 1);
		return res.redirect('/items');
	})

router.route('/:id/edit').get((req, res, next) => {
		const item = items.find(val => val.id === Number(req.params.id));
		return res.render('edit', {item});
	});

module.exports = router;










