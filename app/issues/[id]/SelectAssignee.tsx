"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SelectAssignee = () => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("/api/users");
        const users = response.data;
        setUsers(users);
      } catch (error) {
        console.log(error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users?.map((user) => (
              <Select.Item value={user.id}>{user.email}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default SelectAssignee;
