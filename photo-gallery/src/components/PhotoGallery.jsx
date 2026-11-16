import { useEffect, useState } from "react";
import PhotoCard from "./PhotoCard";

function PhotoGallery() {
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		const fetchPhotos = async () => {
			try {
				setLoading(true);

				const response = await fetch(
					`https://picsum.photos/v2/list?page=${page}&limit=10`,
				);

				if (!response.ok) {
					throw new Error("Failed to fetch photos");
				}

				const data = await response.json();

				if (data.length === 0) {
					setHasMore(false);
					return;
				}

				setPhotos((prev) => [...prev, ...data]);
			} catch (error) {
				console.error("Error fetching photos:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPhotos();
	}, [page]);

	return (
		<div className="min-h-screen bg-[#F7F5F0] px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-2xl font-semibold text-[#514C43] mb-2">
					Photo Gallery
				</h1>

				<p className="text-sm text-[#8B806E] mb-8">
					Explore beautiful photographs from around the world.
				</p>

				<div className="flex flex-col gap-6">
					{photos.map((photo) => (
						<PhotoCard key={photo.id} photo={photo} />
					))}
				</div>

				{loading && (
					<p className="text-center text-sm text-[#8B806E] py-6">
						Loading photos...
					</p>
				)}

				{!hasMore && photos.length > 0 && (
					<p className="text-center text-sm text-[#8B806E] py-6">
						You've reached the end of the gallery.
					</p>
				)}

				{hasMore && !loading && (
					<button
						onClick={() => setPage((prev) => prev + 1)}
						className="block mx-auto mt-8 px-6 py-2 rounded-lg bg-[#70685D] text-white hover:bg-[#514C43] transition-colors"
					>
						Load More
					</button>
				)}
			</div>
		</div>
	);
}

export default PhotoGallery;
