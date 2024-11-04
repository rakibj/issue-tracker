"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const SelectAssignee = ({ issue }: { issue: Issue }) => {
  const { data, error, isFetching } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });
  const users = data;
  // const [users, setUsers] = useState<User[]>();

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get<User[]>("/api/users");
  //       const users = response.data;
  //       setUsers(users);
  //     } catch (error) {
  //       console.log(error);
  //       setUsers([]);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  if (isFetching) return <Skeleton height="2rem" />;
  if (error) return <></>;

  return (
    <>
      <Select.Root
        onValueChange={(userId) => {
          axios.patch("/api/issues/" + issue.id, {
            assignedToUserId: userId == "Unassigned" ? null : userId,
          });
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item key="Unassigned" value="Unassigned">
              Unassigned
            </Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.email}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default SelectAssignee;
