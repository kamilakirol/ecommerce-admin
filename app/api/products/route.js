import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  await mongooseConnect();
  const body = await req.json();
  const { title, description, price } = body;
  const productDoc = await Product.create({
    title,
    description,
    price,
  });

  return NextResponse.json(productDoc);
}

export async function GET(req) {
  await mongooseConnect();
  const productDoc = await Product.find();
  return NextResponse.json(productDoc);
}
