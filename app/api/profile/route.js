import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ error: "Not logged in" },{status: 401});
  }

  const payload = jwt.verify(token.value, process.env.SECRET_KEY);

  return NextResponse.json({data: payload});
}