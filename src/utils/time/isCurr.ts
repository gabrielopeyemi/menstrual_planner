import { getDay, isSameDay } from "date-fns";

export const isCurrentDate = (day: number, rawDate: Date, currentDay: (e: number) => void) => {
    if (isSameDay(rawDate, new Date())) return currentDay(day);
    return false;
  };

export const isFirstDay = (day: number, rawDate: Date) => {
    if (day !== 1) return 0;
    const weekDay = getDay(
      new Date(day, rawDate.getMonth(), rawDate.getFullYear())
    );
    if (weekDay === 0) return 0;
    return weekDay + 1;
  };


