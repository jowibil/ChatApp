
type MessageCallback = (msg: { username: string; content: string }) => void;

const WEBSOCKET_URL = "ws://localhost:8080/ws";

let socket: WebSocket | null = null;
let isConnected = false;


export const connect = (username: string, cb: MessageCallback) => {
  if (isConnected) return;
  isConnected = true;

 
  socket = new WebSocket(
    `${WEBSOCKET_URL}?username=${encodeURIComponent(username)}`
  );

  socket.onopen = () => {
    console.log("Connected to WebSocket");
 
    socket?.send(JSON.stringify({ type: "join", username }));
  };

  socket.onmessage = (event: MessageEvent) => {
    try {
      const parsed = JSON.parse(event.data);
      
      cb({
        username: parsed.username,
        content: parsed.content,
      });
    } catch (err) {
      console.error("Error parsing message", err);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
    isConnected = false;
  };

  socket.onerror = (err) => {
    console.error("WebSocket error", err);
  };
};


export const sendMsg = (username: string, content: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "message", username, content }));
  } else {
    console.warn("Socket not open");
  }
};


export const disconnect = () => {
  isConnected = false;
  socket?.close();
};
