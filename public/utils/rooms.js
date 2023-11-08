const rooms = [];

function roomExists(room) {
    return rooms.includes(room);
  }


function dltroom(room){
  const index = rooms.findIndex((e)=>e == room);

    if(index !== -1){

    return removed = rooms.splice(index,1)[0];

    }
}  

module.exports = {roomExists,dltroom,rooms}
