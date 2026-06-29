import OpenAI from "openai";

import {
  buildActivityPrompt,
  buildLessonPlanPrompt,
  buildParentLetterPrompt,
  tinaSystemPrompt,
} from "./prompts";

import type {
  ActivityInput,
  ActivityOutput,
  LessonPlanInput,
  LessonPlanOutput,
  ParentLetterInput,
  ParentLetterOutput,
} from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type AIUsage = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

export type AIResult<T> = {
  output: T;
  usage: AIUsage;
};

async function generateJSON<T>(prompt: string): Promise<AIResult<T>> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set.");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: tinaSystemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI did not return content.");
  }

  return {
    output: JSON.parse(content) as T,
    usage: {
      promptTokens: response.usage?.prompt_tokens ?? 0,
      completionTokens: response.usage?.completion_tokens ?? 0,
      totalTokens: response.usage?.total_tokens ?? 0,
    },
  };
}

export async function generateLessonPlan(
  input: LessonPlanInput
): Promise<AIResult<LessonPlanOutput>> {
  return generateJSON<LessonPlanOutput>(buildLessonPlanPrompt(input));
}

export async function generateActivity(
  input: ActivityInput
): Promise<AIResult<ActivityOutput>> {
  return generateJSON<ActivityOutput>(buildActivityPrompt(input));
}

export async function generateParentLetter(
  input: ParentLetterInput
): Promise<AIResult<ParentLetterOutput>> {
  return generateJSON<ParentLetterOutput>(buildParentLetterPrompt(input));
}