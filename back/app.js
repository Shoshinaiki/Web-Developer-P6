const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/routeuser");
const sauceRoutes = require("./routes/routesauce");
const path = require('path');
const helmet = require('helmet');
const rate = require('express-rate-limit');

const app = express();

app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(
  rate({
    windowMs: 24 * 60 * 60 * 1000,
    max: 100,
    message:
      "Vous avez effectué plus de 100 requétes dans une limite de 24 heures!",
    headers: true,
  })
);

mongoose.connect('mongodb+srv://Shoshinaiki:Misscri1966@p6hottakes.colhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
module.exports = app;
