/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//https://pub-51c0f911763d47eca915ca53108a4d27.r2.dev
import { db } from "@/server/db";
import { put } from "@vercel/blob";
import {
  SpeechConfig,
  AudioConfig,
  SpeechSynthesizer,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";
import { v4 as uuid } from "uuid";

export const generateAudio = async (
  id: number,
  text = "",
  language = "en-US",
) => {
  const speechConfig = SpeechConfig.fromSubscription(
    process.env.AZURE_SPEECH_KEY!,
    process.env.AZURE_SPEECH_REGION!,
  );
  speechConfig.speechSynthesisLanguage = language;
  speechConfig.speechSynthesisVoiceName = "en-US-AvaNeural";

  const audioConfig = AudioConfig.fromDefaultSpeakerOutput();

  const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

  // ⚠️ The below code is for App Router Route Handlers only
  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      text,
      async function (result) {
        if (result.reason === ResultReason.SynthesizingAudioCompleted) {
          console.log("synthesis finished.", result);
          console.log(result.audioData);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const file = await put(`${uuid()}.mp3`, result.audioData, {
            access: "public",
          });
          await db.post.update({
            where: {
              id,
            },
            data: {
              audioUrl: file.url,
            },
          });
          resolve(file);
        } else {
          reject(
            "Speech synthesis canceled, " +
              result.errorDetails +
              "\nDid you update the subscription info?",
          );
          console.error(
            "Speech synthesis canceled, " +
              result.errorDetails +
              "\nDid you update the subscription info?",
          );
        }
        synthesizer.close();
      },
      function (err) {
        reject("err - " + err);
        console.trace("err - " + err);
        synthesizer.close();
      },
    );
  });
  // Save the audio to CDN or local storage
  // Example: uploadAudioToCDN(result.audioData);

  // res.status(200).json({ audioUrl: 'url-to-your-audio-file' });
};
