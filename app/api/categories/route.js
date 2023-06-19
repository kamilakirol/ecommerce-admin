import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
  await mongooseConnect();
  const body = await req.json();
  const { name, parentCategory } = body;
  const categoryDoc = await Category.create({
    name,
    parentCategory,
  });

  return NextResponse.json(categoryDoc);
}

export async function GET(req) {
  await mongooseConnect();
  const categories = await Category.find().populate("parentCategory");
  return NextResponse.json(categories);
}

export async function PUT(req) {
  await mongooseConnect();
  const body = await req.json();
  const { name, parentCategory, _id } = body;
  await Category.updateOne({ _id }, { name, parentCategory });
  return NextResponse.json(true);
}
