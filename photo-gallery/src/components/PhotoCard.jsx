import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function PhotoCard({ photo }) {
	const [likes, setLikes] = useState(0);

	return (
		<div className="w-full bg-white rounded-xl border border-[#EAE6DF] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
			<img
				src={photo.download_url}
				alt={`Photo by ${photo.author}`}
				className="w-full h-auto object-cover"
				loading="lazy"
			/>

			<div className="flex items-center justify-between px-4 py-3">
				<p className="text-sm font-medium text-[#514C43]">{photo.author}</p>

				<button
					onClick={() => setLikes((prev) => prev + 1)}
					className="flex items-center gap-2 text-[#8B806E] hover:text-[#70685D] transition-colors"
					aria-label="Like photo"
				>
					<FontAwesomeIcon icon={faThumbsUp} />
					<span className="text-sm">{likes}</span>
				</button>
			</div>
		</div>
	);
}

export default PhotoCard;
