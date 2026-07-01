"use server";

import {
  generateActivity,
  generateLessonPlan,
  generateParentLetter,
} from "@/lib/ai/generate";
import { createClient } from "@/utils/supabase/server";

import type {
  ActivityOutput,
  LessonPlanOutput,
  ParentLetterOutput,
} from "@/lib/ai/types";

const MONTHLY_CREDIT_LIMIT = 250;

const AI_CREDIT_COSTS = {
  lessonPlan: 10,
  activity: 6,
  parentLetter: 3,
};

export type GenerateLessonPlanState = {
  success: boolean;
  lesson?: LessonPlanOutput;
  generationId?: string;
  error?: string;
};

export type GenerateActivityState = {
  success: boolean;
  activity?: ActivityOutput;
  generationId?: string;
  error?: string;
};

export type GenerateParentLetterState = {
  success: boolean;
  letter?: ParentLetterOutput;
  generationId?: string;
  error?: string;
};

function getAIErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.includes("429")) {
    return "OpenAI API quota is not active. Add billing or credits in your OpenAI Platform account.";
  }

  return fallback;
}

function monthlyCreditLimitError() {
  return "You’ve reached your monthly AI credit limit. Your credits will reset at the beginning of next month.";
}

async function reserveCredits(
  supabase: Awaited<ReturnType<typeof createClient>>,
  creditCost: number
) {
  const { data, error } = await supabase.rpc("reserve_monthly_ai_credits", {
    p_credit_cost: creditCost,
    p_credit_limit: MONTHLY_CREDIT_LIMIT,
  });

  if (error) {
    console.error("reserve_monthly_ai_credits error:", error);

    return {
      allowed: false,
      error: "Could not check your AI credit balance. Please try again.",
    };
  }

  if (!data?.allowed) {
    return {
      allowed: false,
      error: monthlyCreditLimitError(),
    };
  }

  return {
    allowed: true,
    error: "",
  };
}

async function refundCredits(
  supabase: Awaited<ReturnType<typeof createClient>>,
  creditCost: number
) {
  const { error } = await supabase.rpc("refund_monthly_ai_credits", {
    p_credit_cost: creditCost,
  });

  if (error) {
    console.error("refund_monthly_ai_credits error:", error);
  }
}

async function recordTokenUsage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  }
) {
  const { error } = await supabase.rpc("record_monthly_ai_tokens", {
    p_prompt_tokens: usage.promptTokens,
    p_completion_tokens: usage.completionTokens,
    p_total_tokens: usage.totalTokens,
  });

  if (error) {
    console.error("record_monthly_ai_tokens error:", error);
  }
}

function warnIfLargeUsage(
  tool: string,
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  }
) {
  if (usage.totalTokens > 5000) {
    console.warn("Unexpectedly large AI response", {
      tool,
      usage,
    });
  }
}

export async function generateLessonPlanAction(
  formData: FormData
): Promise<GenerateLessonPlanState> {
  const grade = String(formData.get("grade") || "");
  const subject = String(formData.get("subject") || "");
  const skill = String(formData.get("skill") || "");
  const duration = String(formData.get("duration") || "");
  const notes = String(formData.get("notes") || "");

  if (!grade || !subject || !skill || !duration) {
    return {
      success: false,
      error: "Please fill out grade, subject, skill, and lesson length.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
  return {
    success: false,
    error: "You must be signed in to generate a lesson plan.",
  };
}

const { data: profile } = await supabase
  .from("profiles")
  .select("role, subscription_status")
  .eq("id", user.id)
  .maybeSingle();

const isPro =
  profile?.role === "admin" || profile?.subscription_status === "pro";

if (!isPro) {
  return {
    success: false,
    error: "Upgrade to Pro to use the AI Lesson Planner.",
  };
}

const creditCost = AI_CREDIT_COSTS.lessonPlan;
  const creditReservation = await reserveCredits(supabase, creditCost);

  if (!creditReservation.allowed) {
    return {
      success: false,
      error: creditReservation.error,
    };
  }

  try {
    const input = {
      grade,
      subject,
      skill,
      duration,
      notes,
    };

    const { output: lesson, usage } = await generateLessonPlan(input);

    warnIfLargeUsage("lesson-planner", usage);

    const { data: savedGeneration, error: saveError } = await supabase
      .from("ai_generations")
      .insert({
        user_id: user.id,
        tool: "lesson-planner",
        title: lesson.title,
        input,
        output: lesson,
        credit_cost: creditCost,
        prompt_tokens: usage.promptTokens,
        completion_tokens: usage.completionTokens,
        total_tokens: usage.totalTokens,
      })
      .select("id")
      .single();

    if (saveError) {
      console.error("save lesson ai_generation error:", saveError);
      await refundCredits(supabase, creditCost);

      return {
        success: false,
        error:
          "The lesson generated, but it could not be saved. Check the ai_generations table and RLS policies.",
      };
    }

    await recordTokenUsage(supabase, usage);

    return {
      success: true,
      lesson,
      generationId: savedGeneration.id,
    };
  } catch (error) {
    console.error("generateLessonPlanAction error:", error);
    await refundCredits(supabase, creditCost);

    return {
      success: false,
      error: getAIErrorMessage(
        error,
        "Something went wrong generating your lesson plan."
      ),
    };
  }
}

export async function generateActivityAction(
  formData: FormData
): Promise<GenerateActivityState> {
  const grade = String(formData.get("grade") || "");
  const activityType = String(formData.get("activityType") || "");
  const skill = String(formData.get("skill") || "");
  const duration = String(formData.get("duration") || "");
  const materials = String(formData.get("materials") || "");

  if (!grade || !activityType || !skill || !duration) {
    return {
      success: false,
      error: "Please fill out grade, activity type, skill, and activity length.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
  return {
    success: false,
    error: "You must be signed in to generate an activity.",
  };
}

const { data: profile } = await supabase
  .from("profiles")
  .select("role, subscription_status")
  .eq("id", user.id)
  .maybeSingle();

const isPro =
  profile?.role === "admin" || profile?.subscription_status === "pro";

if (!isPro) {
  return {
    success: false,
    error: "Upgrade to Pro to use the AI Activity Generator.",
  };
}

const creditCost = AI_CREDIT_COSTS.activity;
  const creditReservation = await reserveCredits(supabase, creditCost);

  if (!creditReservation.allowed) {
    return {
      success: false,
      error: creditReservation.error,
    };
  }

  try {
    const input = {
      grade,
      activityType,
      skill,
      duration,
      materials,
    };

    const { output: activity, usage } = await generateActivity(input);

    warnIfLargeUsage("activity-generator", usage);

    const { data: savedGeneration, error: saveError } = await supabase
      .from("ai_generations")
      .insert({
        user_id: user.id,
        tool: "activity-generator",
        title: activity.title,
        input,
        output: activity,
        credit_cost: creditCost,
        prompt_tokens: usage.promptTokens,
        completion_tokens: usage.completionTokens,
        total_tokens: usage.totalTokens,
      })
      .select("id")
      .single();

    if (saveError) {
      console.error("save activity ai_generation error:", saveError);
      await refundCredits(supabase, creditCost);

      return {
        success: false,
        error:
          "The activity generated, but it could not be saved. Check the ai_generations table and RLS policies.",
      };
    }

    await recordTokenUsage(supabase, usage);

    return {
      success: true,
      activity,
      generationId: savedGeneration.id,
    };
  } catch (error) {
    console.error("generateActivityAction error:", error);
    await refundCredits(supabase, creditCost);

    return {
      success: false,
      error: getAIErrorMessage(
        error,
        "Something went wrong generating your activity."
      ),
    };
  }
}

export async function generateParentLetterAction(
  formData: FormData
): Promise<GenerateParentLetterState> {
  const grade = String(formData.get("grade") || "");
  const letterType = String(formData.get("letterType") || "");
  const tone = String(formData.get("tone") || "");
  const message = String(formData.get("message") || "");
  const details = String(formData.get("details") || "");

  if (!grade || !letterType || !tone || !message) {
    return {
      success: false,
      error: "Please fill out grade, letter type, tone, and main message.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
  return {
    success: false,
    error: "You must be signed in to generate a parent letter.",
  };
}

const { data: profile } = await supabase
  .from("profiles")
  .select("role, subscription_status")
  .eq("id", user.id)
  .maybeSingle();

const isPro =
  profile?.role === "admin" || profile?.subscription_status === "pro";

if (!isPro) {
  return {
    success: false,
    error: "Upgrade to Pro to use the AI Parent Letter Helper.",
  };
}

const creditCost = AI_CREDIT_COSTS.parentLetter;
  const creditReservation = await reserveCredits(supabase, creditCost);

  if (!creditReservation.allowed) {
    return {
      success: false,
      error: creditReservation.error,
    };
  }

  try {
    const input = {
      grade,
      letterType,
      tone,
      message,
      details,
    };

    const { output: letter, usage } = await generateParentLetter(input);

    warnIfLargeUsage("parent-letter", usage);

    const { data: savedGeneration, error: saveError } = await supabase
      .from("ai_generations")
      .insert({
        user_id: user.id,
        tool: "parent-letter",
        title: letter.title,
        input,
        output: letter,
        credit_cost: creditCost,
        prompt_tokens: usage.promptTokens,
        completion_tokens: usage.completionTokens,
        total_tokens: usage.totalTokens,
      })
      .select("id")
      .single();

    if (saveError) {
      console.error("save parent letter ai_generation error:", saveError);
      await refundCredits(supabase, creditCost);

      return {
        success: false,
        error:
          "The parent letter generated, but it could not be saved. Check the ai_generations table and RLS policies.",
      };
    }

    await recordTokenUsage(supabase, usage);

    return {
      success: true,
      letter,
      generationId: savedGeneration.id,
    };
  } catch (error) {
    console.error("generateParentLetterAction error:", error);
    await refundCredits(supabase, creditCost);

    return {
      success: false,
      error: getAIErrorMessage(
        error,
        "Something went wrong generating your parent letter."
      ),
    };
  }
}