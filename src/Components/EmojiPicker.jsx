const EMOJIS = [
	"😀",
	"😂",
	"😍",
	"🥰",
	"😊",
	"😎",
	"🤔",
	"😭",
	"🙌",
	"👏",
	"👍",
	"❤️",
	"🔥",
	"🎉",
	"✨",
	"🚀",
	"💯",
	"🙏",
	"👋",
	"💬",
];

function EmojiPicker({ onEmojiSelect, onClose }) {
	return (
		<div className="absolute bottom-14 right-0 w-64 bg-white border border-[#EAE6DF] rounded-xl shadow-lg p-3 z-20">
			<div className="flex items-center justify-between mb-3">
				<h3 className="text-sm font-semibold text-[#514C43]">
					Choose an emoji
				</h3>

				<button
					type="button"
					onClick={onClose}
					className="text-[#A39A8C] hover:text-[#514C43]"
					aria-label="Close emoji picker"
				>
					✕
				</button>
			</div>

			<div className="grid grid-cols-5 gap-2">
				{EMOJIS.map((emoji) => (
					<button
						key={emoji}
						type="button"
						onClick={() => onEmojiSelect(emoji)}
						className="w-10 h-10 rounded-lg text-xl hover:bg-[#F7F5F0] transition-colors"
					>
						{emoji}
					</button>
				))}
			</div>
		</div>
	);
}

export default EmojiPicker;
