export interface YouTubeResponse {
  shabad_number: string;
  youtube_links: YouTubeLink[];
}

export interface YoutubeBody {
  shabad_number: string;
}

export interface YouTubeLink {
  title: string;
  url: string;
  duration: string;
  thumbnail: string;
  views: string;
  channel: string;
}
