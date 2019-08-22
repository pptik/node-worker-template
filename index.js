#!/usr/bin/env node
const inquirer = require('inquirer')
const fs = require('fs')

const CHOICES = fs.readdirSync(`${__dirname}/templates`)
const CURR_DIR = process.cwd()

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true
      else return 'Project name may only include letters, numbers, underscores and hashes.'
    }
  },
  {
    name: 'project-description',
    type: 'input',
    message: 'Project Description: '
  },
  {
    name: 'project-author',
    type: 'input',
    message: 'Project Author: '
  }
]


inquirer.prompt(QUESTIONS)
  .then(answers => {
    const projectChoice = answers['project-choice']
    const projectName = answers['project-name']
    const projectDescription = answers['project-description']
    const projectAuthor = answers['project-author']
    const templatePath = `${__dirname}/templates/${projectChoice}`

    fs.mkdirSync(projectName)

    createDirectoryContents(templatePath, projectName)
  })
  .then(() => {
    console.log('Project generated. Please update necessary files.')
  })

function createDirectoryContents (templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      
      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}