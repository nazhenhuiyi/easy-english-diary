import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { NextRequest } from "next/server";
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
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  // generateAudio(diaryRes.id, diary, "en-US");
  return Response.json({
    success: true,
    data: diaryRes,
  });
}
