"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button asChild>
        <Link href="/create">Write an English Diary</Link>
      </Button>
    );
  }

  return (
    <div className="flex flex-1">
      <Link
        href="/login"
        className="flex items-center text-sm font-semibold leading-6 text-gray-900"
      >
        <span className="mr-2">Log in</span>
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
};
