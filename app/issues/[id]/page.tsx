import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import SelectAssignee from "./SelectAssignee";
import { cache } from "react";
interface Props {
  params: Promise<{ id: string }>;
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const issueId = parseInt(id);
  const issue = await fetchIssue(issueId);
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="1rem">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex direction="column" width="10rem" gap="4">
          <SelectAssignee issue={issue} />
          <EditIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const id = (await params).id;
  const issue = await fetchIssue(parseInt(id));
  return {
    title: issue?.name,
    description: issue?.dsecription,
  };
}

export default IssueDetailsPage;
