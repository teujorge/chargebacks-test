export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  uploadDate: string;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
}
