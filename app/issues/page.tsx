import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueTable from "./_components/IssueTable";
import IssueActions from "./IssueActions";
import { Flex } from "@radix-ui/themes";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const issueCount = await prisma.issue.count({
    where: { status: params.status },
  });
  const currentPage = parseInt(params.page) || 1;
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable issueQuery={searchParams} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;
export const pageSize = 10;
export default IssuesPage;
