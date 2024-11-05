import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const getIssueCount = async (status: Status) => {
  const issues = await prisma.issue.findMany({ where: { status: status } });
  return issues.length;
};

const IssueSummary = async () => {
  const issueSummaries: { label: string; status: Status; count: number }[] = [
    {
      label: "Open Issues",
      status: "OPEN",
      count: await getIssueCount("OPEN"),
    },
    {
      label: "In-progress Issues",
      status: "IN_PROGRESS",
      count: await getIssueCount("IN_PROGRESS"),
    },
    {
      label: "Closed Issues",
      status: "CLOSED",
      count: await getIssueCount("CLOSED"),
    },
  ];

  return (
    <>
      <Flex gap="3">
        {issueSummaries.map((issueSummary) => (
          <Card key={issueSummary.status}>
            <Flex direction="column" align="start" gap="2">
              <Link href={`/issues?status=` + issueSummary.status}>
                <Text>{issueSummary.label}</Text>
              </Link>
              <Heading>{issueSummary.count}</Heading>
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default IssueSummary;
