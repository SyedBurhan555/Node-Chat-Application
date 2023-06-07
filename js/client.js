const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById("send-container");
const messsageInput = document.getElementById("messageIp");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

const name = prompt("Enter Your Name");

socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

// socket.on('receive',data=>{
//     append(`${data.message}`)
// })
