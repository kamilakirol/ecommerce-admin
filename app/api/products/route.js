import { NextResponse } from "next/server";

export async function POST(request) {
  return NextResponse.json({ status: "Succes" }, { status: 200 });
}
