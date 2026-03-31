if (typeof io === "undefined") {
  console.error(
    "The Socket.io library did not load! Check your HTML script tag."
  );
} else {
  const socket = io("http://127.0.0.1:3000");

  socket.on("message", (data) => {
    console.log(data);
  });
}
