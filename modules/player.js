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

// ***********************
//    THE PLAYER OBJECT
// ***********************
// This module contains actions
// that alter the player's data
// including moving the player
// and LOOKing based on where the
// player is

module.exports = {
  //---------------------------
  //        getStatus
  //
  // args: none
  // returns: a promise for the players current database row
  //---------------------------
  getStatus: function () {
    let sql = `SELECT * FROM players WHERE player_id=1;`
    return database.query(sql);
  },
  //---------------------------
  //        setLocation
  //
  // args: a room id
  // returns: nothing but sets the players location to the given room id
  // in the database
  //---------------------------
  setLocation: function (room_id) {
    let sql = `UPDATE players SET location=${room_id} WHERE player_id=1;`
    database.query(sql).then().catch((fail)=>{console.log('ERROR!: '+fail)})
  },
  //---------------------------
  //        look
  //
  // args: none
  // returns: nothing
  // actions: logs the current room
  //---------------------------
  look: function () {
    this.getStatus().then(
      (player)=>{
        let sql = `SELECT * FROM rooms WHERE room_id=${player[0].location} LIMIT 1`;
        database.query(sql).then(
          (location)=>{
            console.log('');
            console.log('**************************************');
            console.log('      '+location[0].name);
            console.log('**************************************');
            console.log(location[0].description);
            let viable_exits =[];
            if (location[0].north) {
              viable_exits.push('north');
            }
            if (location[0].east) {
              viable_exits.push('east');
            }
            if (location[0].south) {
              viable_exits.push('south');
            }
            if (location[0].west) {
              viable_exits.push('west');
            }
            console.log('Exits: '+viable_exits);
          }
        )
      }
    ).catch((fail)=>{console.log('ERROR!: '+fail)});
  },
  //---------------------------
  //        walk
  // args: ['north','south','east','west']
  // actions:
  //  1) check for viable exit
  //  2) find corresponding room
  //  3) set the players position =  corresponding room
  //---------------------------
  walk: function (dir) {
    // GET PLAYER DATA
    console.log(dir);
    this.getStatus().then((player)=>{
      // GET EXIT_ID FROM THE CORRESPONDING ROOM DIRECTION
      let sql = `SELECT ${dir} FROM rooms WHERE room_id=${player[0].location} LIMIT 1`;
      database.query(sql).then((room)=>{
        // GET ROOM EXIT OBJECT
        let exit_id = 0;
        if (dir=='north') { exit_id = room[0].north };
        if (dir=='east') { exit_id = room[0].east };
        if (dir=='south') { exit_id = room[0].south };
        if (dir=='west') { exit_id = room[0].west };
        let sql = `SELECT * FROM exits WHERE exit_id=${exit_id}`;
        database.query(sql).then((exit)=>{
          // MOVE THE PLAYER TO THE OPPOSITE ROOM
          if (player[0].location == exit[0].room1) {
            this.setLocation(exit[0].room2);
            this.look();
          }
          else {
            this.setLocation(exit[0].room1);
            this.look();
          }
        }).catch((fail)=>{
          //if the query fails assume the value is null and respond as an invalid exit
          console.log('you cannot go that way');
        });
      }).catch((fail)=>{console.log('ERROR! room: '+fail)});
    }).catch((fail)=>{console.log('ERROR! status: '+fail)});
  },
}
