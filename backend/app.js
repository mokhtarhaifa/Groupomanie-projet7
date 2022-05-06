//Imporation du freamork express
const express = require('express');

const app = express();

// connexion bd
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', '', {
  host: 'localhost',
  dialect:  'mysql'
});
// test connexion
try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }



 app.use(express.json());
 app.use("/publication", require('./routes/publication')) 
 app.use("/comment", require('./routes/comment')) 
 app.use("/user", require('./routes/user')) 

module.exports = app;