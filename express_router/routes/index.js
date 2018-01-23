const express = require('express');

const router = express.Router();

const users = [];
let id = 1;

router
	.route('')
	.get((req, res, next) => {
		return res.render('index', {users});
	})
	.post((req, res, next) => {
		users.push({
			name: req.body.name,
			id: ++id
		});
		return res.redirect('/users');
	});

router.route('/new').get((req, res, next) => {
	return res.render('new');
});

router
	.route('/:id')
	.get((req, res, next) => {
		const user = users.find(val => val.id === Number(req.params.id));
		return res.render('user', {user});
	})
	.patch((req, res, next) => {
		const user = users.find(val => val.id === Number(req.params.id));
		user.name = req.body.name;
		return res.redirect('/users');
	})
	.delete((req, res, next) => {
		const userIndex = users.findIndex(val => val.id === Number(req.params.id));
		users.splice(userIndex, 1);
		return res.redirect('/users');
	});

router.route('/:id/edit').get((req, res, next) => {
	const user = users.find(val => val.id === Number(req.params.id));
	return res.render('edit', {user});
});

module.exports = router;










