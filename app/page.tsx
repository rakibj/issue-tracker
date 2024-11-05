import IssueSummary from "./components/IssueSummary";
import LatestIssues from "./components/LatestIssues";
import Pagination from "./components/Pagination";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <>
      <IssueSummary />
    </>
  );
}
