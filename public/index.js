const socket = io("https://chat-app-okog.onrender.com/");

let msg = document.querySelector(".msg-holder");

const sub = document.querySelector(".sub-holder");

const params = window.location.search;
const user = new URLSearchParams(params).get("user");
const room = new URLSearchParams(params).get("room");

let userList = document.querySelector(".userList");

const btn = document.querySelector(".sendBtn");

const lbtn = document.getElementById("leave");

lbtn.addEventListener("click", () => {
  window.location.href = `./index.html`;
});

function scrollDown() {
  msg.scrollTop = msg.scrollHeight;
}

socket.on("Botmsg", (message) => {
  const holder = document.createElement("div");
  const msgDiv = document.createElement("div");
  holder.classList.add("sub-holder1");
  msgDiv.classList.add("msg");
  msgDiv.classList.add("center");
  msgDiv.innerHTML = message;

  holder.append(msgDiv);
  sub.append(holder);
  msg.append(sub);
});

btn.addEventListener("click", sendmsg);

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    sendmsg();
  }
});

function sendmsg() {
  let data = document.querySelector(".txt").value;

  if (data != "") {
    const dt = new Date();
    const hr = dt.getHours();
    const min = dt.getMinutes();

    const ampm = hr >= 12 ? "pm" : "am";
    const formattedHr = hr % 12 || 12; // Convert 0 to 12
    const formattedMin = min < 10 ? `0${min}` : min;
    const tm = `${formattedHr}:${formattedMin}${ampm}`;
    socket.emit("msg", data, user, room, tm);
  }

  let textarea = document.querySelector(".txt");
  textarea.value = "";
}

socket.emit("joinroom", user, room);

socket.emit("newUser", user, room);

socket.on("userdata", (data) => {
  let users = document.querySelector(".users");
  let userList = document.querySelector(".userList");

  let roomName = document.querySelector(".nameHolder");

  roomName.innerHTML = data[0].room;

  userList.innerHTML = " ";

  data.forEach((e) => {
    let users = document.querySelector(".users");
    let userList = document.querySelector(".userList");
    let maindiv = document.createElement("div");
    maindiv.classList.add("username");

    maindiv.innerHTML = `<span class="n1">${e.username}</span>`;

    userList.appendChild(maindiv);
    users.appendChild(userList);
  });
});

socket.on("sendmsg", (message) => {
  msgOutput(message);

  scrollDown();
});

function msgOutput(message) {
  const holder = document.createElement("div");
  const msgDiv = document.createElement("div");

  holder.classList.add("sub-holder1");
  msgDiv.classList.add("msg");

  message.id == socket.id
    ? msgDiv.classList.add("right")
    : msgDiv.classList.add("left");

  msgDiv.innerHTML = `<span class="main_name"><span class="name">${message.user}</span><span class = "date">${message.time}</span></span>
  <div class="content">${message.data}</div>`;

  holder.append(msgDiv);
  sub.append(holder);
  msg.append(sub);
}
