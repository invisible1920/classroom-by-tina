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

  if (!SCHOOL_MONTHS.includes(currentMonth as (typeof SCHOOL_MONTHS)[number])) {
    return [];
  }

  const visibleMonths = [currentMonth];

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

export function getNextMonthReleaseInfo(date = new Date()) {
  const currentMonth = date.toLocaleString("en-US", {
    month: "long",
  });

  if (currentMonth === "July") {
    const augustDate = new Date(date.getFullYear(), 7, 1);
    const releaseDate = new Date(augustDate);
    releaseDate.setDate(releaseDate.getDate() - EARLY_RELEASE_DAYS);

    const daysUntilRelease = Math.max(
      0,
      Math.ceil(
        (releaseDate.getTime() - date.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    return {
      currentMonth,
      nextMonth: "August",
      releaseDate,
      daysUntilRelease,
    };
  }

  if (!SCHOOL_MONTHS.includes(currentMonth as (typeof SCHOOL_MONTHS)[number])) {
    return null;
  }

  if (currentMonth === "June") {
    return {
      currentMonth,
      nextMonth: null,
      releaseDate: null,
      daysUntilRelease: null,
    };
  }

  const nextMonthDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    1
  );

  const nextMonth = nextMonthDate.toLocaleString("en-US", {
    month: "long",
  });

  const releaseDate = new Date(nextMonthDate);
  releaseDate.setDate(releaseDate.getDate() - EARLY_RELEASE_DAYS);

  const daysUntilRelease = Math.max(
    0,
    Math.ceil(
      (releaseDate.getTime() - date.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return {
    currentMonth,
    nextMonth,
    releaseDate,
    daysUntilRelease,
  };
}