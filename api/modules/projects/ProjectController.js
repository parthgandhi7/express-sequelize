/* globals exp */
"use strict"
const router = exp.Router();
const Users = exp.models.Users;
const Projects = exp.models.Projects;
const logger = require('../../../config/logger.js');
const q = require('q');
router.post('/', (req, res) => {
  let projectsObj = req.body;
  Projects.create(projectsObj, {
    include: [{model: Users, as: 'users'}] 
  }).then((project) => {
    res.status(200).send(project);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.get('/', (req, res) => {
  Projects.findAll().then((projects) => {
    logger.info('All projects retreived %s', projects);
    res.status(200).send(projects);
  }).catch((err) => {
    logger.error('Some error occured: ', err);
    res.status(500).send(err);
  });
});

router.get('/:projectid', (req, res) => {
  var responseObj;
  Projects.findById(req.params.projectid).then((project) => {
    responseObj = project.dataValues;
    return project.getUsers();
  }).then((users) => {
    if (users) {
      responseObj.users = users.dataValues;
    }

    res.status(200).send(responseObj);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.post('/:projectid', (req, res) => {
  let projectsObj = req.body;
  projectsObj.id = req.params.projectid;
  Projects.upsert(projectsObj).then((doc) => {
    res.status(200).send(projectsObj);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.delete('/:projectid', (req, res) => {
  Projects.destroy({
    where: {
      id: req.params.projectid
    },
    limit: 1
  }).then((doc) => {
    res.status(200).send("deleted");
  }).catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
