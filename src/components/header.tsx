/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { usePathname } from "next/navigation";
import { Logo } from "./home/logo";
import { match } from "ts-pattern";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
export const Header = () => {
  const router = usePathname();
  const { data: session, status } = useSession();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 max-w-screen-2xl items-center gap-4 px-4 sm:px-8">
        <Logo />
        {[
          { path: "/home", title: "Home" },
          { path: "/create", title: " Write a diary" },
        ].map((v) => (
          <Link
            key={v.path}
            href={v.path}
            className={cn(
              "transition-colors hover:text-foreground/80",
              router === v.path ? "text-foreground" : "text-foreground/60",
            )}
          >
            {v.title}
          </Link>
        ))}
        <span className="ml-auto"></span>
        {match(status)
          .with("loading", () => null)
          .with("unauthenticated", () => (
            <Button asChild>
              <Link href="/login">Log in</Link>
            </Button>
          ))
          .with("authenticated", () => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={session?.user?.image ?? ""}
                      alt={session?.user?.name ?? ""}
                    />
                    <AvatarFallback>User avatar</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))
          .exhaustive()}
      </div>
    </div>
  );
};
