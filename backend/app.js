//Imporation du freamork express
const express = require('express');
const path = require('path');
const cors= require('cors')

const helmet = require("helmet");

const app = express();

const publicationRoutes = require('./routes/publication');
const userRoutes =require('./routes/userAuth');


const dotenv = require("dotenv");
dotenv.config()
// connexion bd
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,'', {
  host: 'localhost',
  dialect: 'mysql',
  
});
// test connexion
try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
//middelware de configuration de cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


 app.use(express.json());
 app.use(cors());
 // sécuriser les en-têtes HTPP
 app.use(helmet({
   crossOriginResourcePolicy: false,
 }));

 app.use('/auth', userRoutes);
 app.use('/images', express.static(path.join(__dirname, '/images')));
 app.use("/publication", publicationRoutes) 
 app.use("/comment", require('./routes/comment')) 
 app.use("/user", require('./routes/user')) 

module.exports = app;