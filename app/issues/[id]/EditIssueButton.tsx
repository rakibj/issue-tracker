import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Flex, Link, Text } from "@radix-ui/themes";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <Button>
        <Link href={`/issues/${issueId}/edit`}>
          <Flex align="center" gap="2">
            <Pencil1Icon />
            <Text className="text-slate-200">Edit Issue</Text>
          </Flex>
        </Link>
      </Button>
    </>
  );
};

export default EditIssueButton;
