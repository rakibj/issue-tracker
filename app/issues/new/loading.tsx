import React from "react";
import delay from "delay";
import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingNewIssuePage = async () => {
  await delay(2000);
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
