const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

const userRoutes = require('./routes');

app.set('view engine', 'pug');
app.use(express.static('/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use('/users', userRoutes);

app.get('/', (req, res, next) => {
	return res.redirect('/users');
})

app.listen('8000', () => console.log('App is being served on port 8000....'));