'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var BosonicGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the Bosonic generator. You will now generate a boilerplate for a new Web Component.'));

    var prompts = [{
      name: 'elementName',
      message: 'What do you want to call your new element?',
    }];

    this.prompt(prompts, function (props) {
      this.elementName = props.elementName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('demo');
    this.mkdir('test');

    this.template('_package.json', 'package.json');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.copy('karma.conf.js', 'karma.conf.js');

    this.template('_test.js', 'test/'+this.elementName+'.js');

    this.template('_component.html', 'src/'+this.elementName+'.html');
    this.template('_demo.html', 'demo/index.html');
  },

  projectfiles: function () {
    this.copy('gitignore', '.gitignore');
  }
});

module.exports = BosonicGenerator;