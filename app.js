//CREATION DES CONSTANTES
const express = require('express');
const bodyParser = require('body-parser');
const saucesRoutes = require('./routes/sauces.js');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const path = require('path');

const { MONGO_PASSWORD } = process.env;

mongoose.connect(`mongodb+srv://emma:${MONGO_PASSWORD}@cluster0.33wtk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log('connexion réussie'))
    .catch(() => console.log('connexion échouee'));

const app = express();


//CREATION DES ROUTES**********************************************************
//----------Ajout des Headers-------------------------------------------------
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//n'importe quelle route accède à notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//transformer le corps de la requête en objet js
app.use(bodyParser.json()); 

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;