/* globals exp */
"use strict"
const router = exp.Router();
const Users = exp.models.Users;
const Addresses = exp.models.Addresses;
const Projects = exp.models.Projects;
const Photos = exp.models.Photos;

const userAddressAssociation = exp.associations.userAddress;
const userPhotosAssociation = exp.associations.userPhotos;

const logger = require('../../../config/logger.js');
const q = require('q');
router.post('/', (req, res) => {
  let usersObj = req.body;
  Users.create(usersObj, {
    include: [{
      model: Addresses,
      as: 'address'
    }, {
      model: Projects,
      as: 'projects'
    }, userPhotosAssociation]
  }).then((user) => {
    res.status(200).send(user);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.get('/', (req, res) => {
  Users.findAll().then((users) => {
    logger.info('All users retreived %s', users);
    res.status(200).send(users);
  }).catch((err) => {
    logger.error('Some error occured: ', err);
    res.status(500).send(err);
  });
});

router.get('/:userid', (req, res) => {
  let responseObj;
  let usersObj;
  Users.findById(req.params.userid).then((user) => {
    responseObj = user.dataValues;
    usersObj = user;
    return usersObj.getAddress();
  }).then((address) => {
    if (address) {
      responseObj.address = address.dataValues;
    }

    return usersObj.getProjects();
  }).then((projects) => {
    if (projects) {
      responseObj.projects = JSON.parse(JSON.stringify(projects));
    }

    return usersObj.getPics();
  }).then((photos) => {
    if (photos) {
      responseObj.pics = JSON.parse(JSON.stringify(photos));
    }

    res.status(200).send(responseObj);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

router.post('/:userid', (req, res) => {
  let usersObj = req.body;
  usersObj.id = req.params.userid;
  Users.upsert(usersObj).then((doc) => {
    res.status(200).send(usersObj);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.delete('/:userid', (req, res) => {
  Users.destroy({
    where: {
      id: req.params.userid
    },
    limit: 1
  }).then((doc) => {
    res.status(200).send("deleted");
  }).catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
