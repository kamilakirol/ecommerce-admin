import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const bucketName = "kamila-next-ecommerce";
import mime from "mime-types";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function POST(req) {
  await mongooseConnect();
  await isAdminRequest();

  const form = await req.formData();
  const files = form.getAll("files");

  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const links = [];
  for (const file of files) {
    const name = file.name;
    const ext = name.split(".").pop();
    const newFilename = Date.now() + "." + ext;

    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: await file.arrayBuffer(),
        ACL: "public-read",
        ContentType: mime.lookup(file),
      })
    );
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }
  return NextResponse.json({ links });
}
