import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const totalPages = Math.ceil(itemCount / pageSize);
  return (
    <>
      <Flex align="center" gap="2">
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button color="gray" variant="soft" disabled={currentPage == 1}>
          <DoubleArrowLeftIcon />
        </Button>
        <Button color="gray" variant="soft" disabled={currentPage == 1}>
          <ArrowLeftIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage == totalPages}
        >
          <ArrowRightIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage == totalPages}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </>
  );
};

export default Pagination;
