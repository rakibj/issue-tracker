import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  if (!users) return NextResponse.json("No users found", { status: 400 });
  return NextResponse.json(users, { status: 200 });
}
