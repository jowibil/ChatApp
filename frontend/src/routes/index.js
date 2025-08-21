var socket = new WebSocket("ws://localhost:8080/ws");

let connect = cb => {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Connected");
  };

  socket.onmessage = (msg) => {
    console.log("Raw msg", msg);
    try {
      const parsedMsg = JSON.parse(msg.data);
      console.log("Received: ", parsedMsg)
      cb({ data: parsedMsg });
    } catch (error) {
      console.error("Error parsing message:", error)
      cb({ data: { type: 0, bpdy: msg.data } });
    }
  };

  socket.onclose = (event) => {
    console.log("Connection closed", event);
  };

  socket.onerror = (err) => {
    console.log("Socket Error", err);
  };
};

let sendMsg = (msg) => {
  console.log("Received: ", msg);
  socket.send(msg);
};

export { connect, sendMsg };
