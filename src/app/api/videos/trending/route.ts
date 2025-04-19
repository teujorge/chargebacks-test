import { sleep } from "@/lib/sleep";
import { NextResponse } from "next/server";
import { getFakeVideos } from "../data";

export async function GET() {
  await sleep();
  const videos = getFakeVideos();
  return NextResponse.json(videos);
}
