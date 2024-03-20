"use client";

import { cn } from "@/lib/utils";
import type { Post } from "@prisma/client";
import dayjs from "dayjs";
import { IoIosMore } from "react-icons/io";
import { IoPauseCircleOutline } from "react-icons/io5";
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
import { PiFileAudio } from "react-icons/pi";

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
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    speechSynthesis.cancel();

    const newUtterance = new SpeechSynthesisUtterance(
      diary.optimizedText as string,
    );
    newUtterance.lang = "en-US";
    newUtterance.rate = 0.8;
    newUtterance.onstart = () => setIsSpeaking(true);
    newUtterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(newUtterance);
  };

  const pauseText = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      setIsSpeaking(false);
    }
  };

  return (
    <div
      className={cn(
        "text-md w-full flex-1 rounded border bg-card p-4 text-card-foreground shadow sm:max-w-[720px]",
      )}
    >
      <h3 className="flex scroll-m-20 items-center gap-2 text-xl font-semibold tracking-tight">
        {dayjs(diary.createdAt).format("MMM DD, YYYY H:mm ")}
        {!isSpeaking ? (
          <PiFileAudio className="ml-auto" onClick={speakText} size={20} />
        ) : (
          <IoPauseCircleOutline
            className="ml-auto"
            size={20}
            onClick={pauseText}
          />
        )}
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
