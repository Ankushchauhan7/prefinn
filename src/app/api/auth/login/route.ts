import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const authRes = await fetch("http://147.93.96.111:3000/api/authentication/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${email}:${password}`).toString("base64"),
    },
  });

  const data = await authRes.json();
  const token = authRes.headers.get("authorization");

  if (!authRes.ok || !token) {
    return NextResponse.json({ message: data.message || "Login failed" }, { status: 401 });
  }

  const response = NextResponse.json({ message: "Login successful" });

  // Set HttpOnly cookie
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
