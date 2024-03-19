"use client";

import { cn } from "@/lib/utils";
import type { Post } from "@prisma/client";
import dayjs from "dayjs";
// import { PiFileAudioDuotone } from "react-icons/pi";
// import { CiPause1 } from "react-icons/ci";
// import { useAudio } from "react-use";

export const DiaryCard = ({ diary }: { diary: Post }) => {
  //   const [audio, state, controls] = useAudio({
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     src: diary.audioUrl,
  //     autoPlay: false,
  //   });
  return (
    <div
      className={cn(
        "text-md w-full flex-1 rounded border bg-card p-4 text-card-foreground shadow sm:max-w-[720px]",
      )}
    >
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {dayjs(diary.createdAt).format("MMM DD, YYYY h:mm A")}
      </h3>
      {/* {audio} */}
      {/* <div className="flex select-none justify-end">
        {state.playing ? (
          <CiPause1
            className="cursor-pointer"
            size={20}
            onClick={() => controls.pause()}
          />
        ) : (
          <PiFileAudioDuotone
            className="cursor-pointer"
            size={20}
            onClick={() => controls.play()}
          />
        )}
      </div> */}
      <div className="mt-1 text-lg">{diary.optimizedText}</div>
    </div>
  );
};
