import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const IssueStatusBadge = ({ status }: { status: Status }) => {
  type StatusRecord = Record<
    Status,
    { label: string; color: "red" | "violet" | "green" }
  >;
  const statusRecords: StatusRecord = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "violet" },
    CLOSED: { label: "Closed", color: "green" },
  };
  return (
    <Badge color={statusRecords[status].color}>
      {statusRecords[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
