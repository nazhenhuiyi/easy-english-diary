import { redirect } from "next/navigation";

import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { WriteDiary } from "./write-diary";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Redirect unauthenticated users to the login page
    redirect("/login");
  }
  return <WriteDiary />;
};
export default Page;
