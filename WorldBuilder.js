
// ***********************
//      EXPLORER
// ***********************
// This Application simulates the player perspective
// while building. The 'player' object contains the
// current coordinates of the user and each time
// they 'look' they are shown the room description
// that matches their coordinates

// ***********************
//          IMPORTS
// ***********************
const database = require('./modules/database.js');
const player = require('./modules/player.js');
const menus = require('./modules/menus.js');



menus.request_command();
