import prisma from "@/prisma/client";
import React from "react";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";

const EditIssuePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const issueId = parseInt((await params).id);
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  if (!issue) notFound();

  return (
    <>
      <IssueForm issue={issue} />
    </>
  );
};

export default EditIssuePage;
