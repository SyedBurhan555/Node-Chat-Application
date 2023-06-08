const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById("send-container");
const messsageInput = document.getElementById("messageIp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("apple.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position === "left") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messsageInput.value;
  append(`you : ${message}`, "right");
  socket.emit("send", message);
  messsageInput.value = "";
});

const name = prompt("Enter Your Name");

socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

socket.on("receive", (data) => {
  append(`${data.name} : ${data.message} `, "left");
});

socket.on("left", (name) => {
  append(`${name} left the chat`, "left");
});
