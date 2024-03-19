"use client";

import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCallback } from "react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";

const Page = () => {
  const handleCreateDiary = useCallback(
    async (prompt: string, completion: string) => {
      await fetch("/api/create-diary", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ diary: completion, originText: prompt }),
      });
      // redirect to diary page
    },
    [],
  );
  const { completion, input, isLoading, handleInputChange, handleSubmit } =
    useCompletion({
      api: "/api/optimize-diary",
    });
  return (
    <>
      <Header />
      <div className="grid w-full gap-2 px-2 sm:px-20">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          {dayjs().format("MMM DD, YYYY")}
        </h2>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <form
            onSubmit={handleSubmit}
            className="flex flex-[1_1_50%] flex-col gap-2"
          >
            <Textarea
              value={input}
              disabled={isLoading}
              onChange={handleInputChange}
              placeholder="Type your diary here."
              className="text-md"
              rows={15}
            />
            <Button
              type="submit"
              disabled={isLoading || !input}
              className="ml-auto"
            >
              Refine
            </Button>
          </form>
          <div className="flex flex-[1_1_50%] flex-col gap-2">
            <p
              className={cn(
                "text-md min-h-28 flex-1 rounded border bg-card p-4 text-card-foreground shadow",
                !completion ? "text-black/40" : "text-black",
              )}
            >
              {completion || "please input your diary and click Refine button"}
            </p>
            <Button
              onClick={() => handleCreateDiary(input, completion)}
              disabled={!completion}
              className="ml-auto"
            >
              Save Diary
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
