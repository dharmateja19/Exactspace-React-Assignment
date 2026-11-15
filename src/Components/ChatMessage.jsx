import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function ChatMessage({ message, onLike }) {
	return (
		<div className="flex items-start gap-3 w-full">
			<div className="w-10 h-10 shrink-0 rounded-full bg-[#EAE6DF] flex items-center justify-center text-[#70685D] font-semibold">
				{message.username.charAt(0)}
			</div>

			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<span className="text-sm font-semibold text-[#514C43]">
						{message.username}
					</span>

					<span className="text-xs text-[#A39A8C]">{message.time}</span>
				</div>

				<div className="bg-[#F7F5F0] rounded-xl rounded-tl-sm px-4 py-3 inline-block max-w-full">
					<p className="text-sm text-[#514C43] wrap-break">{message.text}</p>
				</div>

				<div className="mt-2">
					<button
						onClick={() => onLike(message.id)}
						className="inline-flex items-center gap-1.5 text-[#8B806E] hover:text-[#70685D] transition-colors"
						aria-label={`Like message from ${message.username}`}
					>
						<FontAwesomeIcon icon={faThumbsUp} className="text-sm" />
						<span className="text-xs font-medium">{message.likes}</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ChatMessage;
