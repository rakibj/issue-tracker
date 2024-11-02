import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return new NextResponse(JSON.stringify(validation.error.errors), {
      status: 400,
    });

  const id = parseInt((await params).id);
  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });
  if (!issue) return new NextResponse("Issue not  found", { status: 400 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
      dsecription: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}
