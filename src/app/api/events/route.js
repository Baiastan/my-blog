import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function POST(req) {
  try {
    //event for future. if i have more events coming up
    const { event } = await req.json();

    let numberOfClicks = await kv.get("resume-click");

    if (numberOfClicks === undefined || !numberOfClicks) {
      numberOfClicks = "1";
    }

    const totalClicks = +numberOfClicks + 1;

    await kv.set("resume-click", totalClicks);

    return NextResponse.json({ message: "Item updated successfully", clicks: totalClicks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update item", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    let numberOfClicks = await kv.get("resume-click");

    return NextResponse.json({ data: { clicks: numberOfClicks } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update item", error }, { status: 500 });
  }
}
