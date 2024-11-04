"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const filterCriterias: { label: string; status?: Status }[] = [
    { label: "All" },
    { label: "Open", status: "OPEN" },
    { label: "In Progress", status: "IN_PROGRESS" },
    { label: "Closed", status: "CLOSED" },
  ];

  const router = useRouter();

  return (
    <>
      <Select.Root
        onValueChange={(status) => {
          const params = status == "None" ? "" : "?status=" + status;
          router.push("/issues" + params);
        }}
      >
        <Select.Trigger placeholder="Filter by..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Filter Criteria</Select.Label>
            {filterCriterias?.map((filterCriteria) => (
              <Select.Item
                key={filterCriteria.label}
                value={filterCriteria.status ? filterCriteria.status : "None"}
              >
                {filterCriteria.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default IssueStatusFilter;
