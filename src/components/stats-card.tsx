/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable @typescript-eslint/no-unsafe-assignment
"use client";
import useSWR from "swr";
export const StatsCard = () => {
  const { data } = useSWR("/api/analytics", (url) =>
    fetch(url).then((res) => res.json()),
  );
  if (!data) return null;
  return (
    <div className="flex gap-6 rounded border bg-card p-4 text-card-foreground shadow">
      {[
        { title: "Total Entries", value: data.data.totalEntries },
        { title: "Total Word Count", value: data.data.totalWordCount },
        { title: "Total Days", value: data.data.consecutiveDays },
      ].map((v, i) => (
        <div key={v.title} className="flex flex-col items-center gap-1">
          <span className="text-xs text-black/70">{v.title}</span>
          <span className="">{v.value}</span>
        </div>
      ))}
    </div>
  );
};
