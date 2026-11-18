export type Track = {
  id: number;
  title: string;
  author: string;
  genre: string;
  durationSec: number;
  imageUrl: string;
};

export type Like = {
  id: number;
  trackId: number;
  trackTitle: string;
  trackAuthor: string;
  durationSec: number;
  user: string;
  createdAt: string;
};

export type NewLike = {
  trackId: number;
  user: string;
};