"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { useSession, signIn, signOut } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

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
            <button
              onClick={() => signOut()}
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              Sign In
            </button>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;
