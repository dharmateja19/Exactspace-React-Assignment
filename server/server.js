import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	socket.on("chat:message", (message) => {
		console.log("New message:", message);
		io.emit("chat:message", message);
	});

	socket.on("chat:like", ({ messageId }) => {
		io.emit("chat:like", { messageId });
	});

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});

	socket.on("chat:reset", () => {
		io.emit("chat:reset");
	});
});

const PORT = 3000;

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
