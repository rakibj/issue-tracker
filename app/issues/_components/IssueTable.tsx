import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueQuery, pageSize } from "../page";
import prisma from "@/prisma/client";

interface Props {
  issueQuery: Promise<IssueQuery>;
}

const IssueTable = async ({ issueQuery }: Props) => {
  const query = await issueQuery;
  const headerColumns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "name" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  const currentPage = parseInt(query.page) || 1;
  const orderBy = headerColumns.find(
    (headerColumn) => headerColumn.value == query.orderBy
  )
    ? { [query.orderBy]: "asc" }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: query.status,
    },
    orderBy: orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {headerColumns.map((headerColumn) => (
              <Table.ColumnHeaderCell
                key={headerColumn.value}
                className={headerColumn.className}
              >
                <Link
                  href={{
                    query: { ...query, orderBy: headerColumn.value },
                  }}
                >
                  {headerColumn.label}
                </Link>
                {headerColumn.value == query.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link
                  className="text-sky-800 text-decoration-line: underline"
                  href={`/issues/${issue.id}`}
                >
                  {issue.name}
                </Link>
                <div className="md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssueTable;
