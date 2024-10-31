import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
interface Props {
  params: { id: string };
}
const IssueDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="1rem">
      <Box>
        <Heading>{issue.name}</Heading>
        <Flex gap="3" py="3">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose">
          <Markdown>{issue.dsecription}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Link href={`/issues/${issue.id}/edit}`}>
            <Flex align="center" gap="2">
              <Pencil1Icon />
              <Text>Edit Issue</Text>
            </Flex>
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
