import { uploadDateToString, viewsToString } from "../toString";

describe("toString utilities", () => {
  describe("uploadDateToString", () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2024-04-01T12:00:00Z"));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('returns "just now" for recent uploads', () => {
      const date = new Date("2024-04-01T11:59:59Z");
      expect(uploadDateToString(date)).toBe("just now");
    });

    it("returns seconds for very recent uploads", () => {
      const date = new Date("2024-04-01T11:59:55Z");
      expect(uploadDateToString(date)).toBe("5 seconds ago");
    });

    it("returns minutes for recent uploads", () => {
      const date = new Date("2024-04-01T11:55:00Z");
      expect(uploadDateToString(date)).toBe("5 minutes ago");
    });

    it("returns hours for older uploads", () => {
      const date = new Date("2024-04-01T07:00:00Z");
      expect(uploadDateToString(date)).toBe("5 hours ago");
    });

    it("returns days for older uploads", () => {
      const date = new Date("2024-03-27T12:00:00Z");
      expect(uploadDateToString(date)).toBe("5 days ago");
    });

    it("returns months for older uploads", () => {
      const date = new Date("2024-01-01T12:00:00Z");
      expect(uploadDateToString(date)).toBe("3 months ago");
    });

    it("returns years for very old uploads", () => {
      const date = new Date("2021-04-01T12:00:00Z");
      expect(uploadDateToString(date)).toBe("3 years ago");
    });
  });

  describe("viewsToString", () => {
    it("formats millions of views correctly", () => {
      expect(viewsToString(1000000)).toBe("1M views");
      expect(viewsToString(1500000)).toBe("1.5M views");
      expect(viewsToString(999999)).toBe("1000K views");
    });

    it("formats thousands of views correctly", () => {
      expect(viewsToString(1000)).toBe("1K views");
      expect(viewsToString(1500)).toBe("1.5K views");
      expect(viewsToString(999)).toBe("999 views");
    });

    it("removes trailing zeros", () => {
      expect(viewsToString(1000000)).toBe("1M views");
      expect(viewsToString(2000000)).toBe("2M views");
      expect(viewsToString(1000)).toBe("1K views");
    });

    it("handles small numbers correctly", () => {
      expect(viewsToString(100)).toBe("100 views");
      expect(viewsToString(10)).toBe("10 views");
      expect(viewsToString(1)).toBe("1 views");
    });
  });
});
