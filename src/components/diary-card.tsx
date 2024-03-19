"use client";

import { cn } from "@/lib/utils";
import type { Post } from "@prisma/client";
import dayjs from "dayjs";
import { IoIosMore } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export const DiaryCard = ({ diary }: { diary: Post }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isOriginTextDialogOpen, setIsOriginTextDialogOpen] = useState(false);

  const handleDeleteDiary = async () => {
    await fetch("/api/delete-diary", {
      method: "POST",
      body: JSON.stringify({
        id: diary.id,
      }),
      credentials: "include",
    });
    window.location.reload();
  };
  return (
    <div
      className={cn(
        "text-md w-full flex-1 rounded border bg-card p-4 text-card-foreground shadow sm:max-w-[720px]",
      )}
    >
      <h3 className="flex scroll-m-20 items-center justify-between text-xl font-semibold tracking-tight">
        {dayjs(diary.createdAt).format("MMM DD, YYYY H:mm ")}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IoIosMore size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsOriginTextDialogOpen(true)}>
              Origin Text
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </h3>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              diary.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDiary}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={isOriginTextDialogOpen}
        onOpenChange={setIsOriginTextDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription className="text-md text-black">
              {diary.originText}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="mt-1 text-lg">{diary.optimizedText}</div>
    </div>
  );
};
