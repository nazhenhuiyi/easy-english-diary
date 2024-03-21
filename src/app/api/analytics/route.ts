import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
// import { generateAudio } from "./generateAudio";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    Response.json({
      success: false,
      error: "unauthorized",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userStats = await db.userDiaryStats.findUnique({
    where: {
      id: session?.user.id as unknown as string,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  // generateAudio(diaryRes.id, diary, "en-US");
  return Response.json({
    success: true,
    data: userStats,
  });
}
