import { useState, useRef, useEffect } from "react";
import ChatMessage from "./Components/ChatMessage";
import ChatInput from "./Components/ChatInput";
import socket from "./socket";

const USER_LIST = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function App() {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");

	const messagesEndRef = useRef(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages]);

	useEffect(() => {
		socket.on("chat:message", (newMessage) => {
			setMessages((prevMessages) => {
				const alreadyExists = prevMessages.some(
					(msg) => msg.id === newMessage.id,
				);

				if (alreadyExists) return prevMessages;

				return [...prevMessages, newMessage];
			});
		});

		socket.on("chat:like", ({ messageId }) => {
			setMessages((prevMessages) =>
				prevMessages.map((msg) =>
					msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg,
				),
			);
		});

		socket.on("chat:reset", () => {
			setMessages([]);
		});

		socket.connect();

		return () => {
			socket.off("chat:message");
			socket.off("chat:like");
			socket.off("chat:reset");
			socket.disconnect();
		};
	}, []);

	const handleReset = () => {
		const confirmed = window.confirm(
			"Are you sure you want to clear the entire chat?",
		);

		if (confirmed) {
			socket.emit("chat:reset");
		}
	};

	const handleSend = () => {
		const trimmedMessage = message.trim();

		if (!trimmedMessage) return;

		const mentionedUsers = [...trimmedMessage.matchAll(/@(\w+)/g)].map(
			(match) => match[1].toLowerCase(),
		);

		const availableUsers = USER_LIST.filter(
			(user) => !mentionedUsers.includes(user.toLowerCase()),
		);

		const userPool = availableUsers.length > 0 ? availableUsers : USER_LIST;

		const randomUser = userPool[Math.floor(Math.random() * userPool.length)];

		const newMessage = {
			id: crypto.randomUUID(),
			username: randomUser,
			text: trimmedMessage,
			likes: 0,
			time: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};

		socket.emit("chat:message", newMessage);

		setMessage("");
	};

	const handleLike = (id) => {
		socket.emit("chat:like", {
			messageId: id,
		});
	};

	return (
		<div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4 sm:p-8">
			<div className="w-full max-w-5xl h-[85vh] min-h-125 bg-white rounded-2xl border border-[#EAE6DF] shadow-sm flex flex-col overflow-hidden">
				<header className="px-6 py-5 border-b border-[#EAE6DF] flex items-center justify-between">
					<div>
						<h1 className="text-xl font-semibold text-[#514C43]">Team Chat</h1>

						<p className="text-sm text-[#A39A8C] mt-1">
							A place to connect and communicate
						</p>
					</div>

					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={handleReset}
							title="Reset chat for everyone"
							aria-label="Reset chat"
							className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F7F5F0] border border-[#EAE6DF] text-xl hover:bg-[#EAE6DF] transition-colors"
						>
							🧹
						</button>
					</div>
				</header>

				<main className="flex-1 overflow-y-auto p-6">
					{messages.length === 0 ? (
						<div className="h-full flex items-center justify-center">
							<div className="text-center">
								<div className="text-4xl mb-3">💬</div>

								<h2 className="text-lg font-medium text-[#514C43]">
									Welcome to Team Chat
								</h2>

								<p className="text-sm text-[#A39A8C] mt-2">
									Start a conversation by sending a message.
								</p>
							</div>
						</div>
					) : (
						<div className="flex flex-col gap-6">
							{messages.map((msg) => (
								<ChatMessage key={msg.id} message={msg} onLike={handleLike} />
							))}
						</div>
					)}

					<div ref={messagesEndRef} />
				</main>

				<footer className="p-5 border-t border-[#EAE6DF]">
					<ChatInput
						message={message}
						setMessage={setMessage}
						onSend={handleSend}
					/>
				</footer>
			</div>
		</div>
	);
}

export default App;
