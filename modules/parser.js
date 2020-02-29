// ***********************
// PACKAGE REQUIREMENTS
// ***********************
const express = require('express');
const mysql = require('mysql');
const promise = require('promise');
const inquirer = require('inquirer');

// ***********************
//          IMPORTS
// ***********************
const database = require('./database.js');
const player = require('./player.js');
const menus = require('./menus.js');
const objects = require('./objects.js');

// ***********************
//      PARSER
// ***********************
module.exports = {
  //---------------------------
  //        find
  // args: two arrays of words
  // returns: an array of words contained in both arrays
  //---------------------------
  find: function(search, words) {
    var matched = [];
    for (var i = 0; i < search.length; i++) {
      for (var j = 0; j < words.length; j++) {
        if (search[i] == words[j]) {
          matched.push(search[i]);
        }
      }
    }
    return matched;
  },
  //---------------------------
  //        parse
  //
  // args: the text given by player
  // does: calls the execute function
  // on the first word in the command
  // that matches a verb.
  //
  // NOTE: To be functional a verb must
  // both be added to the verbs{} object
  // and the player_verbs lookup array
  //---------------------------
  parse: function(text) {
      // player_verbs serves both to give find() data
      // to reference in finding the given verb and to
      // allow me to regulate which verbs are accessible
      // directly by the user
      player_verbs = [
        'look',
        'walk',
        'build',
        'test'
      ]
      // find the word given by user that is a
      // usable verb
      words = text.split(' ');
      found_verb = this.find(player_verbs, words)[0];
      if (found_verb == undefined) {
        console.log('no verb found');
      } else {
        // execute that verb
        this.verbs.execute(found_verb, words)
      }
  },
  //---------------------------
  //        verbs
  //
  // an object that contains
  // all possible verbs invoked
  // by a player command
  //---------------------------
  verbs: {
    look: function(cmds) {
      // TO BE IMPLEMENTED: eventually the find_at function will compare
      // words in cmds to determine if an object exists in the user's
      // current room that the look action will be used on (objects.find_at(1, 'object'))
      // If there is no matching object in the room LOOK will return the room description
      player.look();
    },
    walk: function(cmds) {
      // Determine which direction the player wishes to walk
      // and walk the player in that direction
      possible_directions = ['north','south','east','west'];
      direction = module.exports.find(possible_directions, cmds);
      player.walk(direction[0]);
    },
    build: function(cmds) {
      // NOTE scope_mouthwash exists because for some
      // reason I cannot access the global constant
      // from within this particular nested function
      // scope_mouthwash == menus
      const scope_mouthwash = require('./menus.js');
      scope_mouthwash.room_creation_menu();
    },
    // The parser calls execute to match the suggested verb
    // with a function 
    execute: function(verb, args) {
      try{
        this[verb](args);
      }catch(e){
        throw new Error(e);
      }
    }
  }
};
