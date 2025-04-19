export interface Video {
  id: string;
  title: string;
  description: string;
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

export const getFakeVideos = (): Video[] =>
  [
    {
      id: "1",
      title: "Understanding Chargeback Prevention",
      description:
        "Learn the best practices for preventing chargebacks in your business",
      thumbnail: `https://picsum.photos/seed/${Math.random()}/600`,
      duration: "12:34",
      views: 12500,
      likes: 850,
      author: "John Smith",
      authorAvatar: `https://picsum.photos/seed/${Math.random()}/100`,
      category: "Prevention",
      tags: ["chargeback", "prevention", "best-practices"],
      uploadDate: "2024-03-15",
    },
    {
      id: "2",
      title: "Advanced Fraud Detection Techniques",
      description: "Deep dive into modern fraud detection methods",
      thumbnail: `https://picsum.photos/seed/${Math.random()}/600`,
      duration: "15:20",
      views: 8900,
      likes: 620,
      author: "Sarah Johnson",
      authorAvatar: `https://picsum.photos/seed/${Math.random()}/100`,
      category: "Fraud",
      tags: ["fraud", "detection", "security"],
      uploadDate: "2024-03-10",
    },
    {
      id: "3",
      title: "Case Study: Reducing Chargebacks by 40%",
      description: "Real-world example of successful chargeback reduction",
      thumbnail: `https://picsum.photos/seed/${Math.random()}/600`,
      duration: "18:45",
      views: 15600,
      likes: 920,
      author: "Mike Wilson",
      authorAvatar: `https://picsum.photos/seed/${Math.random()}/100`,
      category: "Case Study",
      tags: ["case-study", "success-story", "reduction"],
      uploadDate: "2024-03-05",
    },
    {
      id: "4",
      title: "Understanding Payment Processing",
      description: "Comprehensive guide to payment processing systems",
      thumbnail: `https://picsum.photos/seed/${Math.random()}/600`,
      duration: "20:10",
      views: 21000,
      likes: 1500,
      author: "Emily Brown",
      authorAvatar: `https://picsum.photos/seed/${Math.random()}/100`,
      category: "Payments",
      tags: ["payment", "processing", "systems"],
      uploadDate: "2024-02-28",
    },
    {
      id: "5",
      title: "New Regulations in Payment Security",
      description: "Latest updates on payment security regulations",
      thumbnail: `https://picsum.photos/seed/${Math.random()}/600`,
      duration: "14:30",
      views: 17800,
      likes: 1100,
      author: "David Lee",
      authorAvatar: `https://picsum.photos/seed/${Math.random()}/100`,
      category: "Regulations",
      tags: ["regulations", "security", "compliance"],
      uploadDate: "2024-02-20",
    },
  ].sort(() => Math.random() - 0.5);
