import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const issues = await prisma.issue.findMany({
    where: {
      status: params.status,
    },
  });
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

  return (
    <div>
      <IssueActions />
      <div className="py-5">
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
                      query: { ...params, orderBy: headerColumn.value },
                    }}
                  >
                    {headerColumn.label}
                  </Link>
                  {headerColumn.value == params.orderBy && (
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
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default IssuesPage;
