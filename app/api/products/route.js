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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const product = await Product.findOne({ _id: id });
    return NextResponse.json(product);
  } else {
    const productDoc = await Product.find();
    return NextResponse.json(productDoc);
  }
}

export async function PUT(req) {
  await mongooseConnect();
  const body = await req.json();
  const { title, description, price, _id } = body;
  await Product.updateOne({ _id }, { title, description, price });
  return NextResponse.json(true);
}

export async function DELETE(req) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const product = await Product.deleteOne({ _id: id });
    return NextResponse.json(true);
  }
}
