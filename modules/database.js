// ***********************
// PACKAGE REQUIREMENTS
// ***********************
const express = require('express');
const mysql = require('mysql');
const promise = require('promise');

// ***********************
// DATABASE CONNECTION
// ***********************
const db=mysql.createConnection({
  host    :'localhost',
  user    :'Dixon',
  password:'Octobersky##86',
  database:'Dixons_Fictions',
});
const app = express();
db.connect((err)=> {
  if(err){
    throw err;
  }
});
// ***********************
// TO BE IMPLEMENTED:
// + MAKE A DATABASE INSTALLER
// + INCLUDE VARIABLE DATABASE CONNECTIONS
//  - save db connections to a config file
//    and prompt upon startup
// ***********************



module.exports={
  //---------------------------
  //        query
  // args: a sql query
  // returns: a promise for the data
  //---------------------------
  query: function (sql) {
    return new Promise(function(resolve, reject){
      db.query(sql, (err, rows)=>{
          if (err) {
            reject(err);
          }
          else {
            resolve(rows);
          }
      });
    });
  },
  //---------------------------
  //     build_db_world
  //
  // NOTE: Changes have made this
  // defunct. Ideallly this function
  // will allow me to create a fresh
  // set of tables on brand new databases
  //---------------------------
  build_db_world: function () {
    // ESTABLISH QUERIES FOR TABLE CREATION
    // - TO DO: ALLOW FOR CUSTOM DATABASES AND SWITCHING OF CONNECTIONS
    let players_sql = "CREATE TABLE IF NOT EXISTS players (player_id INT PRIMARY KEY AUTO_INCREMENT, location INT);"
    let rooms_sql = "CREATE TABLE IF NOT EXISTS rooms (room_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(30), description VARCHAR(400), north INT, south INT, east INT, west INT);"
    let exits_sql = "CREATE TABLE IF NOT EXISTS exits (exit_id INT PRIMARY KEY AUTO_INCREMENT, room1 INT, room2 INT);"
    let players_meta_sql = "CREATE TABLE IF NOT EXISTS players_meta (player_id INT, meta_key VARCHAR(30), meta_value VARCHAR(30))"
    let room_keys = "ALTER TABLE rooms ADD CONSTRAINT north FOREIGN KEY (north) REFERENCES exits(exit_id), ADD CONSTRAINT east FOREIGN KEY (east) REFERENCES exits(exit_id), ADD CONSTRAINT south FOREIGN KEY (south) REFERENCES exits(exit_id), ADD CONSTRAINT west FOREIGN KEY (west) REFERENCES exits(exit_id);"
    let exits_keys = "ALTER TABLE exits ADD CONSTRAINT room1 FOREIGN KEY (room1) REFERENCES rooms(room_id), ADD CONSTRAINT room2 FOREIGN KEY (room2) REFERENCES rooms(room_id);"
    let players_keys = "ALTER TABLE players ADD CONSTRAINT location FOREIGN KEY (location) REFERENCES rooms(room_id);"
    let players_meta_key = "ALTER TABLE players_meta ADD CONSTRAINT player_id FOREIGN KEY (player_id) REFERENCES players(player_id);"
    // ESTABLISH QUERIES FOR ESSENTIAL TABLE ITEMS
    let insert_void_sql = "INSERT INTO rooms (name, description) VALUES ('The Void', 'There is nothing here');"
    let insert_player_sql = "INSERT INTO players (location) VALUES (1);"
    // CREATE TABLES
    this.query(rooms_sql).then(()=>{
      console.log('Rooms table built');
      this.query(exits_sql).then(()=>{
        console.log('Exits table built');
        this.query(players_sql).then(()=>{
          console.log('Players table built');
          this.query(players_meta_sql).then(()=>{
            // CONNECT FOREIGN KEYS AFTER TABLES ARE BUILT
            this.query(room_keys).then(console.log('Exits connected')).catch((fail)=>{console.log(fail);});
            this.query(exits_keys).then(console.log('Rooms connected')).catch((fail)=>{console.log(fail);});
            this.query(players_keys).then(console.log('Players connected')).catch((fail)=>{console.log(fail);});
            this.query(players_meta_key).then(console.log('Player Meta connected')).catch((fail)=>{console.log(fail);});
            // INSERT ITEMS INTO TABLES
            this.query(insert_void_sql).then(console.log('Void Created')).catch((fail)=>{console.log(fail);});
            this.query(insert_player_sql).then(console.log('Player Created')).catch((fail)=>{console.log(fail);});
          }).catch((fail)=>{console.log(fail);})
        }).catch((fail)=>{console.log(fail);});
      }).catch((fail)=>{console.log(fail);});
    }).catch((fail)=>{console.log(fail);});
  },
}
