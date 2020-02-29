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
const prompts = require('./menus.js')

// ***********************
//    ROOM BUILDING TOOLS
// NOTE: Not Currently Implemented
// ***********************
module.exports = {
  create_room: function (name,description,location){

  },
  alter_description: function (room_id, description){

  },
  alter_name: function(room_id, name){
    player.getStatus().then((status)=>{
      let sql = `UPDATE rooms SET name=${new_name} WHERE room_id=${status[0].location}`;
      database.query(sql).then().catch((fail)=>{console.log('Error setting name: '+fail)})
    })
  }
  alter_location: function (room_id, location) {

  }
};
