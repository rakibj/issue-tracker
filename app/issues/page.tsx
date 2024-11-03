import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActions from "./IssueActions";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  // await delay(1000);
  return (
    <div>
      <IssueActions />
      <div className="py-5">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created At
              </Table.ColumnHeaderCell>
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
