import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./_components/IssueStatusFilter";

const IssueActions = () => {
  return (
    <>
      <Flex mb="3" justify="between">
        <IssueStatusFilter />
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
    </>
  );
};

export default IssueActions;
