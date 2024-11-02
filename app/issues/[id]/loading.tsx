import { Box } from "@radix-ui/themes";
import React from "react";
import delay from "delay";
import { Skeleton } from "@/app/components";

const LoadingIssueDetailsPage = async () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="3rem" />
      <Skeleton />
      <Skeleton count={5} />
    </Box>
    // <p>Loading...</p>
  );
};

export default LoadingIssueDetailsPage;
