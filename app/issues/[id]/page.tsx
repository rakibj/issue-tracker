import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
interface Props {
  params: Promise<{ id: string }>;
}
const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="1rem">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailsPage;
