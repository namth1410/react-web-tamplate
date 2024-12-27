export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

export const formatTimeV1 = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const convertISOToCustomFormat = (isoString: string): string => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "pm" : "am";

  // Định dạng tháng và ngày thành dạng dd/MM/yyyy
  const formattedDate = `${day}/${month < 10 ? "0" + month : month}/${year}`;

  // Định dạng giờ theo 12 giờ và thêm vào 'am' hoặc 'pm'
  let formattedHours = hours % 12;
  formattedHours = formattedHours ?? 12; // Nếu là 0 thì chuyển thành 12
  const formattedTime = `${formattedHours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds} ${ampm}`;

  return `${formattedDate} ${formattedTime}`;
};

export function formatISODateTime(isoString: string | undefined | null): {
  date: string | null;
  time: string | null;
} {
  if (!isoString) {
    return {
      date: null,
      time: null,
    };
  }

  const date = new Date(isoString);
  const formattedDate = date.toLocaleDateString("vi-VN");
  const formattedTime = date.toLocaleTimeString("vi-VN");

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export const sevenDaysAgo = (): { start: string; end: string } => {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);
  const start = sevenDaysAgo.toISOString();

  const end = now.toISOString();

  return {
    start,
    end,
  };
};

export const parseISODuration = (
  duration: string
): {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
} => {
  const regex = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?T?(?:(\d+)H)?/;
  const match = duration.match(regex);

  if (!match) {
    throw new Error("Invalid ISO 8601 duration format.");
  }

  const [, years, months, weeks, days, hours] = match;

  return {
    years: parseInt(years, 10) || 0,
    months: parseInt(months, 10) || 0,
    weeks: parseInt(weeks, 10) || 0,
    days: parseInt(days, 10) || 0,
    hours: parseInt(hours, 10) || 0,
  };
};

export const addDuration = (
  date: Date | string,
  duration: {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
  }
): Date => {
  const newDate = new Date(date);

  const { years = 0, months = 0, weeks = 0, days = 0, hours = 0 } = duration;

  newDate.setFullYear(newDate.getFullYear() + years);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setDate(newDate.getDate() + weeks * 7 + days);
  newDate.setHours(newDate.getHours() + hours);
  newDate.setMinutes(0);
  newDate.setSeconds(0);

  return newDate;
};

export const getDurationInDays = (duration: string): number => {
  const parsed = parseISODuration(duration);
  return (
    parsed.years * 365 + parsed.months * 30 + parsed.weeks * 7 + parsed.days
  );
};

export const getDurationInMonths = (duration: string): number => {
  const parsed = parseISODuration(duration);
  return parsed.years * 12 + parsed.months + Math.floor(parsed.weeks / 4);
};

export const convertToISO8601 = ({
  years = 0,
  months = 0,
  days = 0,
}: {
  years?: number;
  months?: number;
  days?: number;
}): string => {
  if (years === 0 && months === 0 && days === 0) {
    throw new Error(
      "At least one value (years, months, or days) must be greater than 0."
    );
  }

  const durationParts = [];
  if (years > 0) durationParts.push(`${years}Y`);
  if (months > 0) durationParts.push(`${months}M`);
  if (days > 0) durationParts.push(`${days}D`);

  return `P${durationParts.join("")}`;
};
