// import { mongooseConnect } from "@/lib/mongoose";
// import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  const form = await req.formData();

  return new Promise((resolve, reject) => {
    try {
      const file = form.get("file");

      return NextResponse.json("ok");
    } catch (err) {
      return new Response(JSON.stringify({ error: "Server Side Error !" }), {
        status: 500,
      });
    }
  });
}
