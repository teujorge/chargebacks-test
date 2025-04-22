import { render, screen } from "@testing-library/react";
import { VideoCard, VideoCardSkeletons } from "../video-card";
import type { Video } from "@/types";

// Mock the Video type
const mockVideo: Video = {
  id: "test-video-1",
  title: "Test Video Title",
  author: "Test Author",
  authorAvatar: "https://example.com/avatar.jpg",
  thumbnail: "https://example.com/thumbnail.jpg",
  views: 1100000,
  uploadDate: "2024-01-01T00:00:00Z",
  duration: "10:30",
  likes: 5000,
  category: "Technology",
  tags: ["test", "video", "technology"],
};

describe("VideoCard", () => {
  beforeAll(() => {
    // Set a fixed date for all tests
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-04-01T00:00:00Z"));
  });

  afterAll(() => {
    // Restore real timers
    jest.useRealTimers();
  });

  it("renders video information correctly", () => {
    render(<VideoCard video={mockVideo} />);

    // Check if all elements are rendered
    expect(screen.getByText(mockVideo.title)).toBeInTheDocument();
    expect(screen.getByText(mockVideo.author)).toBeInTheDocument();
    expect(screen.getByText("1.1M views • 3 months ago")).toBeInTheDocument();
    expect(screen.getByText(mockVideo.duration)).toBeInTheDocument();
  });

  it("renders in short format correctly", () => {
    render(<VideoCard video={mockVideo} isShort={true} />);

    // Duration should not be visible in short format
    expect(screen.queryByText(mockVideo.duration)).not.toBeInTheDocument();
    // Author avatar should not be visible in short format
    expect(screen.queryByAltText(mockVideo.author)).not.toBeInTheDocument();
  });

  it("renders loading state correctly", () => {
    render(<VideoCard video={undefined} />);

    // Check if loading placeholders are present
    expect(
      screen.getByText("Title Loading... Title Loading... Title Loading..."),
    ).toBeInTheDocument();
    expect(screen.getByText("Author Loading...")).toBeInTheDocument();
  });

  it("renders multiple skeletons correctly", () => {
    render(<VideoCardSkeletons count={3} />);

    // Should render 3 loading cards
    const loadingTitles = screen.getAllByText(
      "Title Loading... Title Loading... Title Loading...",
    );
    expect(loadingTitles).toHaveLength(3);
  });
});
