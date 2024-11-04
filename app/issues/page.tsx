import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
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

  const params = await searchParams;
  const pageSize = 10;
  const issueCount = await prisma.issue.count({
    where: { status: params.status },
  });
  const pageCount = Math.ceil(issueCount / pageSize);
  const currentPage = parseInt(params.page) || 1;

  const orderBy = headerColumns.find(
    (headerColumn) => headerColumn.value == params.orderBy
  )
    ? { [params.orderBy]: "asc" }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: params.status,
    },
    orderBy: orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

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
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default IssuesPage;
