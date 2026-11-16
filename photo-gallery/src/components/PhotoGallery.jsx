import { useEffect, useRef, useState } from "react";
import PhotoCard from "./PhotoCard";

function PhotoGallery() {
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const observerRef = useRef(null);

	// Fetch photos whenever the page changes
	useEffect(() => {
		const fetchPhotos = async () => {
			try {
				setLoading(true);

				const response = await fetch(
					`https://picsum.photos/v2/list?page=${page}`,
				);

				if (!response.ok) {
					throw new Error("Failed to fetch photos");
				}

				const data = await response.json();

				if (data.length === 0) {
					setHasMore(false);
					return;
				}

				setPhotos((prevPhotos) => [...prevPhotos, ...data]);
			} catch (error) {
				console.error("Error fetching photos:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPhotos();
	}, [page]);

	// Observe the bottom element for infinite scrolling
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading && hasMore) {
					setPage((prevPage) => prevPage + 1);
				}
			},
			{
				threshold: 0,
				rootMargin: "200px",
			},
		);

		const currentElement = observerRef.current;

		if (currentElement) {
			observer.observe(currentElement);
		}

		return () => {
			observer.disconnect();
		};
	}, [loading, hasMore]);

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

				{!hasMore && (
					<p className="text-center text-sm text-[#8B806E] py-6">
						You've reached the end of the gallery.
					</p>
				)}

				{/* Invisible element observed for infinite scrolling */}
				{hasMore && (
					<div ref={observerRef} className="h-10" aria-hidden="true" />
				)}
			</div>
		</div>
	);
}

export default PhotoGallery;
