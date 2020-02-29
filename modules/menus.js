// ***********************
// PACKAGE REQUIREMENTS
// ***********************
const promise = require('promise');
const inquirer = require('inquirer');

// ***********************
//          IMPORTS
// ***********************
const database = require('./database.js');
const player = require('./player.js');
const parser = require('./parser.js');

// ***********************
//      prompts
// ***********************
module.exports = {
  //---------------------------
  //    room_creation_menu
  // requests all required input
  // for building a new room
  // then calls the construction
  // function
  //---------------------------
  room_creation_menu: function (){
    var build_questions = [
      {type:'list', name:'direction', message:'Which direction would you like to build', choices:['north','south','east','west']},
      {type:'input', name:'name', message:"What is this room's name?"},
      {type:'input', name:'description', message:"Describe this room..."}];
    inquirer.prompt(build_questions).then(answers=>{
      console.log(answers);
    }).catch((error)=>{})
  },
  //---------------------------
  //    request_command
  // prompts the user for a 
  // command
  //---------------------------
  request_command: function(){
    var command = {type:"input",name:"command",message:"CMD:>"}
    inquirer.prompt(command).then(answers=>{
      parser.parse(answers.command);
      this.request_command();
    }).catch((error)=>{
      console.log(error);
      this.request_command();
    });
  }
}
