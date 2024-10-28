import { createIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  const newIssue = await prisma.issue.create({
    data: { name: body.name, dsecription: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
