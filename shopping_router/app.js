const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

const listRoutes = require('./routes');

app.set('view engine', 'pug');
app.use(express.static('/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use('/items', listRoutes);

app.get('/', (req, res, next) => {
	return res.redirect('/items');
})

app.listen('8000', () => console.log('App is being served on port 8000....'));