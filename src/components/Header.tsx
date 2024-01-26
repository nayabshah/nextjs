"use client";

import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.status === "authenticated") {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data.user?.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <Button onClick={() => signOut()}>Sign Out</Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <Button
            onClick={() => signIn("github")}
            color="secondary"
            variant="bordered"
          >
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={() => signIn("github")}
            color="primary"
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </>
    );
  }

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input label="Search..." />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">{authContent}</NavbarContent>
    </Navbar>
  );
}

export default Header;
