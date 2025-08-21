# 💬 ChatApp

A simple real-time chat application built with **Go**, **React**, and **WebSockets**.  
This project demonstrates a minimal yet functional chat system with a Go backend and a React frontend.

---

## 📖 Overview
ChatApp allows users to connect and chat in real time through WebSocket communication.  
It consists of:
- **Backend** (Go) — WebSocket server handling messages and connections.
- **Frontend** (React) — User interface for sending and receiving chat messages.

---

## 🚀 Features
- Real-time messaging with WebSockets
- Go-based lightweight backend server
- React-based frontend interface
- Simple setup (just run both servers)

---

```
ChatApp/
├── backend/      # Go WebSocket server
│   └── main.go
└── frontend/     # React app (Vite)
    ├── src/
    ├── package.json
    └── vite.config.js
```


---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/jowibl/ChatApp.git
cd ChatApp

cd backend
go run main.go
```
The backend server will start on http://localhost:8080

```
cd frontend
npm install
npm run dev
```
The frontend will start on http://localhost:5173

▶️ Usage

Run both backend and frontend as described above.

Open http://localhost:5173
 in your browser.

Start chatting in real-time 🎉

🤝 Contributing

Pull requests are welcome! If you’d like to contribute:

Fork this repository

Create a new feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add new feature')

Push to your branch (git push origin feature-name)

Open a Pull Request

📜 License

This project is licensed under the MIT License.

