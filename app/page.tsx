import { Status } from "@prisma/client";
import IssueSummary from "./components/IssueSummary";
import LatestIssues from "./components/LatestIssues";
import Pagination from "./components/Pagination";
import prisma from "@/prisma/client";
import IssueChart from "./components/IsssueChart";
import { Flex, Grid } from "@radix-ui/themes";

interface Props {
  searchParams: Promise<{ page: string }>;
}

const getIssueCount = async (status: Status) => {
  const issues = await prisma.issue.findMany({ where: { status: status } });
  return issues.length;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const openIssues = await getIssueCount("OPEN");
  const inProgressIssues = await getIssueCount("IN_PROGRESS");
  const closedIssues = await getIssueCount("CLOSED");
  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} justify="center" gap="5">
        <Flex direction="column" align="start" gap="5">
          <IssueSummary
            open={openIssues}
            inProgress={inProgressIssues}
            closed={closedIssues}
          />
          <IssueChart
            open={openIssues}
            inProgress={inProgressIssues}
            closed={closedIssues}
          />
        </Flex>
        <Flex direction="column">
          <LatestIssues />
        </Flex>
      </Grid>
    </>
  );
}
