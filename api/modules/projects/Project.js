"use strict"
const Sequelize = require('sequelize');
const sequelize = exp.sequelize;
const Project = sequelize.define('project', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

const UserProject = sequelize.define('user_project', {
  role: Sequelize.STRING
});

exp.models.Users.belongsToMany(Project, { through: UserProject });
Project.belongsToMany(exp.models.Users, { through: UserProject });

// Project.sync({force: true}).then((done) => {
//   UserProject.sync({force: true});
// })

global.exp.models.Projects = Project;
