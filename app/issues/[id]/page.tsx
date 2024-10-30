import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}
const IssueDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) notFound();

  return (
    <div>
      <p>{issue?.id}</p>
      <p>{issue?.name}</p>
      <p>{issue?.dsecription}</p>
      <p>{issue?.status}</p>
      <p>{issue?.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailsPage;
