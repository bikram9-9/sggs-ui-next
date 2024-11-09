interface YoutubeEmbedProps {
  videoId: string;
  title?: string;
}

export function YoutubeEmbed({
  videoId,
  title = "YouTube video player",
}: YoutubeEmbedProps) {
  return (
    <div className="relative w-full h-full">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
