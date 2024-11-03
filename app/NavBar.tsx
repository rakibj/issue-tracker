"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];
  classNames;

  return (
    <nav className="p-3 border-b mb-5">
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href={"/"}>
            <FaBug />
          </Link>
          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={classNames({
                    "text-zinc-900": pathname == link.href,
                    "text-zinc-500 hover:text-zinc-800 transition-colors": true,
                  })}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Box className="ml-auto flex space-x-4">
          {session ? (
            <>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user?.image!}
                    fallback={"?"}
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user?.email!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Button onClick={() => signOut()}>Sign Out</Button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </>
          ) : (
            <Button onClick={() => signIn("google")}>Sign In</Button>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;
