import { Category } from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { name } = body;
  const categoryDoc = await Category.create({
    name,
  });

  return NextResponse.json(categoryDoc);
}
