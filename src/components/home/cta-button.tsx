"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const CtaButton = (props: { className?: string }) => {
  const { data: session } = useSession();

  return (
    <Button className={cn(props.className)}>
      <Link
        href={session ? "/app" : "/login"}
        className="text-sm font-semibold  "
      >
        Write an English Diary
      </Link>
    </Button>
  );
};
