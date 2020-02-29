// ***********************
// PACKAGE REQUIREMENTS
// ***********************
const express = require('express');
const mysql = require('mysql');
const promise = require('promise');

// ***********************
//          IMPORTS
// ***********************
const database = require('./database.js');
const player = require('./player.js');

// **********************************
//    OBJECT CREATION AND MANIPULATION
// **********************************
// This module contains functions for
// determining or setting the location
// or properties of non-actor objects
// within the world

module.exports = {
  //---------------------------
  //        find_at
  //
  // args: a location id # and a type (either object, actor, or all)
  // returns: a promise for the ids of all
  // things at that location
  //---------------------------
  find_at: function (location, type) {
    return new Promise(function(resolve, reject){
      let sql = `SELECT ${type}_id FROM ${type}_meta_data WHERE meta_key='location' AND meta_value='1'`
      database.query(sql).then((results)=>{console.log(results)}).catch(()=>{});
    })
  }
};
