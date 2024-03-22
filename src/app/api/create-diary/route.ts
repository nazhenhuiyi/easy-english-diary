import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { NextRequest } from "next/server";
import dayjs from "dayjs";
// import { generateAudio } from "./generateAudio";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    Response.json({
      success: false,
      error: "unauthorized",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { diary, originText } = await req.json();
  const diaryRes = await db.post.create({
    data: {
      originText: originText as string,
      optimizedText: diary as string,
      audioUrl: "",
      createdById: session?.user.id as unknown as string,
    },
  });
  const wordCount = (diary as string)
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  try {
    const oldUserStats = await db.userDiaryStats.findFirst({
      where: {
        id: session?.user.id as unknown as string,
      },
    });
    const userStats = await db.userDiaryStats.upsert({
      where: {
        id: session?.user.id as unknown as string,
      },
      create: {
        id: session?.user.id as unknown as string,
        totalEntries: 1,
        lastEntryDate: new Date(),
        totalWordCount: wordCount,
        consecutiveDays: 1,
      },
      update: {
        totalEntries: {
          increment: 1,
        },
        totalWordCount: {
          increment: wordCount,
        },
        consecutiveDays: {
          increment:
            dayjs(new Date()).diff(oldUserStats?.lastEntryDate, "day") >= 1
              ? 1
              : 0,
        },
        lastEntryDate: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
  }

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  // generateAudio(diaryRes.id, diary, "en-US");
  return Response.json({
    success: true,
    data: diaryRes,
  });
}
