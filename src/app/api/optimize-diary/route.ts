import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { prompt } = await req.json();
  const response = await fetch("https://api.goapi.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GO_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "user",
          content: `
  ### instruction ###
the following is a diary entry, please optimize the content to be more like a english native speaker write.
please only output the content without any additional text.
  ### origin text ###
  ${prompt}`,
        },
      ],
    }),
  });

  // Ask OpenAI for a streaming chat completion given the prompt

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
