import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPaperPlane,
	faFaceSmile,
	faAt,
} from "@fortawesome/free-solid-svg-icons";

import EmojiPicker from "./EmojiPicker";
import MentionSuggestions from "./MentionSuggestions";

const USER_LIST = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function ChatInput({ message, setMessage, onSend }) {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const mentionMatch = message.match(/(?:^|\s)@([a-zA-Z]*)$/);

	const mentionQuery = mentionMatch ? mentionMatch[1] : "";

	const filteredUsers = mentionMatch
		? USER_LIST.filter((user) =>
				user.toLowerCase().startsWith(mentionQuery.toLowerCase()),
			)
		: [];

	const showMentionSuggestions = mentionMatch !== null;

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!message.trim()) return;

		onSend();
		setShowEmojiPicker(false);
	};

	const handleEmojiSelect = (emoji) => {
		setMessage((prev) => prev + emoji);
	};

	const handleMentionSelect = (username) => {
		const updatedMessage = message.replace(/(?:^|\s)@[a-zA-Z]*$/, (match) => {
			const prefix = match.startsWith(" ") ? " " : "";
			return `${prefix}@${username} `;
		});

		setMessage(updatedMessage);
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center gap-3">
			<div className="relative flex-1 min-w-0">
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type your message..."
					className="w-full px-4 py-3 pr-20 bg-[#F7F5F0] border border-[#EAE6DF] rounded-xl text-sm text-[#514C43] placeholder:text-[#A39A8C] outline-none focus:border-[#B9A18D] transition-colors"
				/>

				<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
					<button
						type="button"
						onClick={() => {
							setShowEmojiPicker((prev) => !prev);
						}}
						className="text-[#A39A8C] hover:text-[#70685D]"
						aria-label="Open emoji picker"
					>
						<FontAwesomeIcon icon={faFaceSmile} />
					</button>

					<button
						type="button"
						onClick={() => {
							setMessage((prev) => prev + "@");
						}}
						className="text-[#A39A8C] hover:text-[#70685D]"
						aria-label="Mention a user"
					>
						<FontAwesomeIcon icon={faAt} />
					</button>
				</div>

				{showEmojiPicker && (
					<EmojiPicker
						onEmojiSelect={handleEmojiSelect}
						onClose={() => setShowEmojiPicker(false)}
					/>
				)}

				{showMentionSuggestions && (
					<MentionSuggestions
						users={filteredUsers}
						onSelect={handleMentionSelect}
					/>
				)}
			</div>

			<button
				type="submit"
				disabled={!message.trim()}
				className="flex items-center gap-2 px-5 py-3 bg-[#8B806E] hover:bg-[#70685D] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-colors"
			>
				Send
				<FontAwesomeIcon icon={faPaperPlane} />
			</button>
		</form>
	);
}

export default ChatInput;
