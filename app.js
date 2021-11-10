const express = require('express');//ok
const bodyParser = require('body-parser');//ok
const mongoose = require('mongoose');//ok
const path = require('path');//ok
const saucesRoutes = require('./routes/Produits');//ok
const userRoutes = require('./routes/user');//ok

//Ok sur mongoose
mongoose.connect('mongodb+srv:// + process.env.DB_USER_PASS + @cluster0.33wtk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();//ok

//ok pour toute la fonction (accéder à l'API, faire fonctionner les routes)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// **********

app.use(bodyParser.json());//ok transforme l'objet JSOn en objet JS

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);//ok
app.use('/api/auth', userRoutes);

module.exports = app;