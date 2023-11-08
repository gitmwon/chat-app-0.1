const socket = io("http://localhost:8080");

const btn = document.getElementById('submit');
const btn2 = document.getElementById('submit2');

        btn.addEventListener('click',(e)=>{
            e.preventDefault();

            const name1 = document.getElementById('user').value;
            const room = document.getElementById('room').value;

            socket.emit("checkroom",name1,room);

            socket.on('create',(data)=>{
                if(data == true){
                    window.location.href = `./chat.html?user=${name1}&room=${room}`;
                }
            })

        })

        btn2.addEventListener('click',(e)=>{
            e.preventDefault();
            const name1 = document.getElementById('user1').value;
            const room = document.getElementById('room1').value;

            //console.log(name1);

            socket.emit("checkjoin",name1,room);

            socket.on('join',(data)=>{
                if(data == true){
                    window.location.href = `./chat.html?user=${name1}&room=${room}`;
                }
            })

        })
       

