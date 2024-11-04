"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(itemCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params);
  };

  return (
    <>
      <Flex align="center" gap="2">
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage == 1}
          onClick={() => changePage(1)}
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage == 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage == totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          <ArrowRightIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage == totalPages}
          onClick={() => changePage(totalPages)}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </>
  );
};

export default Pagination;
