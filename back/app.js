const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/routeuser");
const sauceRoutes = require("./routes/routesauce");


const app = express();

app.use(express.json());


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
  
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
module.exports = app;
