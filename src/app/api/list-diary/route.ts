import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { NextRequest } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    Response.json({
      success: false,
      error: "unauthorized",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  const diaryRes = await db.post.findMany({
    where: {
      createdById: session?.user.id as unknown as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return Response.json({
    success: true,
    data: diaryRes,
  });
}
