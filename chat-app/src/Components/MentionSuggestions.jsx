function MentionSuggestions({ users, onSelect }) {
	if (users.length === 0) return null;

	return (
		<div className="absolute bottom-14 left-0 w-56 bg-white border border-[#EAE6DF] rounded-xl shadow-lg p-2 z-30">
			<p className="px-3 py-2 text-xs font-medium text-[#A39A8C]">
				SUGGESTED USERS
			</p>

			{users.map((user) => (
				<button
					key={user}
					type="button"
					onClick={() => onSelect(user)}
					className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F7F5F0] transition-colors text-left"
				>
					<div className="w-8 h-8 rounded-full bg-[#EAE6DF] flex items-center justify-center text-sm font-semibold text-[#70685D]">
						{user.charAt(0)}
					</div>

					<span className="text-sm font-medium text-[#514C43]">{user}</span>
				</button>
			))}
		</div>
	);
}

export default MentionSuggestions;
