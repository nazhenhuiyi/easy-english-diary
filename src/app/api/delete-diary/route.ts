import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { id } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    Response.json({
      success: false,
      error: "unauthorized",
    });
  }

  const diaryRes = await db.post.delete({
    where: {
      id: id as unknown as number,
      createdById: session?.user.id as unknown as string,
    },
  });
  return Response.json({
    success: true,
    data: diaryRes,
  });
}
