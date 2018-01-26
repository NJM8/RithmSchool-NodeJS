const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');

const { petRouter } = require('./routes');
const { ownerRouter } = require('./routes');

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//app.use('/owners/:ownerID/pets', petRouter);
app.use('/owners', ownerRouter);

app.get('/', (req, res, next) => {
  return res.redirect('/owners');
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.render('owners/error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen('8000', () => console.log('Serving app on port 8000.....'));