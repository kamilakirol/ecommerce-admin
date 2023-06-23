import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function POST(req) {
  await mongooseConnect();
  await isAdminRequest();

  const body = await req.json();
  const { name, parentCategory, properties } = body;
  const categoryDoc = await Category.create({
    name,
    parentCategory: parentCategory || undefined,
    properties,
  });

  return NextResponse.json(categoryDoc);
}

export async function GET(req) {
  await mongooseConnect();
  await isAdminRequest();

  const categories = await Category.find().populate("parentCategory");
  return NextResponse.json(categories);
}

export async function PUT(req) {
  await mongooseConnect();
  await isAdminRequest();
  const body = await req.json();
  const { name, parentCategory, properties, _id } = body;
  await Category.updateOne(
    { _id },
    {
      name,
      parentCategory: parentCategory || undefined,
      properties,
    }
  );
  return NextResponse.json(true);
}

export async function DELETE(req) {
  await mongooseConnect();
  await isAdminRequest();
  const { searchParams } = new URL(req.url);
  const _id = searchParams.get("_id");

  if (_id) {
    await Category.deleteOne({ _id: _id });
    return NextResponse.json(true);
  }
}
