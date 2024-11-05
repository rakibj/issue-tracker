import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const issueSummaries: { label: string; status: Status; count: number }[] = [
    {
      label: "Open Issues",
      status: "OPEN",
      count: open,
    },
    {
      label: "In-progress Issues",
      status: "IN_PROGRESS",
      count: inProgress,
    },
    {
      label: "Closed Issues",
      status: "CLOSED",
      count: closed,
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
