"use strict"
const Sequelize = require('sequelize');
const sequelize = exp.sequelize;
const Photos = sequelize.define('photos', {
  url: {
    type: Sequelize.STRING
  }
});

var userPhotoAssociation = exp.models.Users.hasMany(Photos, {
  as: 'pics'
});
// Photos.sync({force: true});
global.exp.associations.userPhotos = userPhotoAssociation;

global.exp.models.Photos = Photos;
