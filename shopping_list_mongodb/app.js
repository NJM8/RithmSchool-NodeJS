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

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  return next(err);
});

app.use((err, req, res, next) => {
  // console.error(err.stack)
  // res.status(500).send('Something broke!')
  res.status(err.status || 500);
  return res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen('8000', () => console.log('App is being served on port 8000....'));