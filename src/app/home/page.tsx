import { DiaryCard } from "@/components/diary-card";
import { Header } from "@/components/header";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Redirect unauthenticated users to the login page
    redirect("/login");
  }
  const diaryRes = await db.post.findMany({
    where: {
      createdById: session?.user.id as unknown as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Header />
      <div className="mt-4 flex flex-col items-center gap-4 px-2 sm:px-4">
        {diaryRes.map((v) => (
          <DiaryCard diary={v} key={v.id} />
        ))}
      </div>
    </>
  );
};

export default Page;
