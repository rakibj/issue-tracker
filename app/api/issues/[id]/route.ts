import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json("Please authenticate first", { status: 401 });
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
