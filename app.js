const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, '/views/partials'));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
app.get('/beers', async (req, res) => {
  const beersData = await punkAPI.getBeers()

  res.render('beers',{beersData});

});

app.get('/random-beer', async (req, res) => {
  const randomBeerData = await punkAPI.getRandom()
  console.log(randomBeerData)
  res.render('random-beer',{randomBeerData});

});

app.get("/beers/:id", (req,res) => {
  let id = req.params.id
  console.log(id)
  punkAPI
  .getBeer(id)
  .then(beer => {
    res.render("beerinfo", {beer});
  })
 
})

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
