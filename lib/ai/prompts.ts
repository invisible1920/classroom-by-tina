import type {
  ActivityInput,
  LessonPlanInput,
  ParentLetterInput,
} from "./types";

export const tinaSystemPrompt = `
You are Tina, a warm, practical, experienced Charlotte-Mecklenburg Schools K–2 teacher.

Write for CMS elementary teachers.
Everything must be classroom-ready, realistic, specific, and easy to teach from immediately.
Use a polished teacher-friendly voice.
Avoid vague phrases.
Avoid generic filler.
Do not give tiny answers.
Do not write paragraphs that sound like a product description.
Return only valid JSON.
`;

export function buildLessonPlanPrompt(input: LessonPlanInput) {
  return `
Create a COMPLETE CMS K–2 lesson plan.

Grade: ${input.grade}
Subject: ${input.subject}
Skill or standard: ${input.skill}
Duration: ${input.duration}
Extra notes: ${input.notes || "None"}

The lesson must be detailed enough that a teacher could teach from it immediately.

Requirements:
- Include a clear student-friendly learning objective.
- Include realistic classroom materials.
- Include a short warm-up.
- Include direct instruction/modeling.
- Include exact teacher language the teacher can say.
- Include guided practice.
- Include independent or partner practice.
- Include a quick check or assessment.
- Include differentiation for students who need support.
- Include differentiation for students ready for extension.
- Include pacing suggestions.
- Include classroom management or transition tips.
- Keep it age-appropriate for CMS K–2.
- Make it specific to the skill provided.
- Do not be generic.
- Do not make each section one sentence.

Return this JSON shape exactly:
{
  "title": "",
  "grade": "",
  "subject": "",
  "duration": "",
  "objective": "",
  "materials": [],
  "miniLesson": "",
  "studentPractice": "",
  "differentiation": "",
  "teacherNotes": ""
}

Field rules:
- "title": short teacher-friendly title.
- "objective": 2-3 sentences. Include what students will do and how the teacher will know they understand.
- "materials": 5-10 specific materials.
- "miniLesson": 2-4 short paragraphs. Include warm-up, modeling, and exact teacher language.
- "studentPractice": 2-4 short paragraphs. Include guided practice, partner or independent practice, and quick check.
- "differentiation": 2 short paragraphs. One for support and one for extension.
- "teacherNotes": 2-4 short paragraphs. Include pacing, classroom tips, transitions, and assessment look-fors.
`;
}

export function buildActivityPrompt(input: ActivityInput) {
  return `
Create a COMPLETE CMS K–2 classroom activity.

Grade: ${input.grade}
Activity type: ${input.activityType}
Skill or topic: ${input.skill}
Duration: ${input.duration}
Materials available: ${input.materials || "Common classroom materials"}

The activity must be ready for a teacher to use immediately.

Requirements:
- Make the activity specific to the skill or topic.
- Include setup before students begin.
- Include exact teacher directions.
- Include clear student steps.
- Include materials.
- Include differentiation for support and extension.
- Include a quick check.
- Include classroom management tips when helpful.
- Keep it age-appropriate for CMS K–2.
- Do not be generic.
- Do not make each section one sentence.

Return this JSON shape exactly:
{
  "title": "",
  "grade": "",
  "activityType": "",
  "duration": "",
  "setup": "",
  "materials": [],
  "teacherDirections": "",
  "studentSteps": "",
  "differentiation": "",
  "quickCheck": ""
}

Field rules:
- "title": short teacher-friendly title.
- "setup": 2-3 detailed sentences.
- "materials": 4-8 specific materials.
- "teacherDirections": 2-4 short paragraphs with exact language.
- "studentSteps": numbered or clearly sequenced steps written in teacher-friendly language.
- "differentiation": include support and extension.
- "quickCheck": specific way to check understanding before ending.
`;
}

export function buildParentLetterPrompt(input: ParentLetterInput) {
  return `
Create a polished CMS K–2 parent letter.

Grade: ${input.grade}
Letter type: ${input.letterType}
Tone: ${input.tone}
Main message: ${input.message}
Important details: ${input.details || "None"}

Requirements:
- Warm, clear, and professional.
- Easy for families to understand.
- Sound like a real teacher wrote it.
- Keep it concise, but not too short.
- Include all important details.
- Avoid jargon.
- Do not invent dates or school policies.
- Do not overpromise.

Return this JSON shape exactly:
{
  "title": "",
  "grade": "",
  "letterType": "",
  "tone": "",
  "greeting": "",
  "body": "",
  "importantDetails": "",
  "closing": ""
}

Field rules:
- "title": short title for the message.
- "greeting": friendly opening.
- "body": 2-4 short paragraphs.
- "importantDetails": bullets or short paragraph with key details.
- "closing": warm closing.
`;
}