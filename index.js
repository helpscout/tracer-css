const express = require('express');
const expressHandleBars = require('express-handlebars');

const app = express();

app.engine('hbs', expressHandleBars({
  // defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.listen(3000, () => {
  console.log('http://localhost:3000/')
});

module.exports = app;
