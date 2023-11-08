const users = [];

function Adduser(name,id,room){
    let user = {
        username:name,
        id,
        room,
    }

    users.push(user);
}

function dltuser(id){
    const index = users.findIndex((e)=>e.id == id);

    if(index !== -1){

    return removed = users.splice(index,1)[0];

    }
}

function getuser(room){
   
    let userdata = users.filter((user)=> user.room == room);

    return userdata;
}

module.exports = {Adduser,getuser,dltuser};





