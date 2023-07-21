import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req) {
  await mongooseConnect();
  const ordersDoc = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(ordersDoc);
}
