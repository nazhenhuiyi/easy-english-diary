import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" aria-label="Home" className="flex items-center gap-2">
      <Image
        src="/logo.webp"
        alt="logo"
        width={40}
        height={40}
        className="h-10 w-10 rounded"
      />
      <span className="hidden font-semibold sm:block">Easy English Diary</span>
    </Link>
  );
};
