const SCHOOL_MONTHS = [
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
] as const;

const EARLY_RELEASE_DAYS = 4;

export function getTeacherVisibleMonths(date = new Date()): string[] {
  const currentMonth = date.toLocaleString("en-US", {
    month: "long",
  });

  // Outside the school year, don't expose anything unexpected.
  if (!SCHOOL_MONTHS.includes(currentMonth as (typeof SCHOOL_MONTHS)[number])) {
    return [];
  }

  const visibleMonths = [currentMonth];

  // June is the final curriculum month.
  if (currentMonth === "June") {
    return visibleMonths;
  }

  const nextMonthDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1
  );

  const releaseDate = new Date(nextMonthDate);
  releaseDate.setDate(releaseDate.getDate() - EARLY_RELEASE_DAYS);

  if (date >= releaseDate) {
    const nextMonth = nextMonthDate.toLocaleString("en-US", {
      month: "long",
    });

    if (
      SCHOOL_MONTHS.includes(
        nextMonth as (typeof SCHOOL_MONTHS)[number]
      )
    ) {
      visibleMonths.push(nextMonth);
    }
  }

  return visibleMonths;
}