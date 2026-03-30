const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const cache = new Map<string, string>();

export async function findBestVideo(
    query: string,
    manualVideoId?: string
): Promise<string | null> {
    if (manualVideoId) return manualVideoId;

    if (cache.has(query)) return cache.get(query)!;

    if (!YOUTUBE_API_KEY) {
        console.warn('No YouTube API key found');
        return null;
    }

    try {
        const searchQuery = encodeURIComponent(
            `${query} setup tutorial how to use`
        );
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}&relevanceLanguage=en&videoDuration=medium`,
            { next: { revalidate: 86400 } }
        );

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            cache.set(query, videoId);
            return videoId;
        }
    } catch (error) {
        console.error('YouTube search failed:', error);
    }

    return null;
}