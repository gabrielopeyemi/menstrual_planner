import { getDay, isSameDay, isSameMonth, isWithinInterval } from "date-fns";
import { menstrualProps } from "../interface";

const periodTemp = (temp: Date) => Array.from({length: 5 }, () => {
  const each = new Date(temp);
  each.setDate(temp.getDate() + 1);
  temp = new Date(each);
  return each;
})

const isPeriodTemp = (temp: Date[], day: number, rawDate: Date) => {
  const isFound = temp.find((each) => each.getDate() === day && each.getMonth() === rawDate.getMonth());
  if (isFound) {
    return true;
  }
  return false;
};

const useCalendar = (rawDate: Date, menstrual: menstrualProps, currentDay: (days: number) => void) => {


    const isCurrentDate = (day: number) => {
        if (isSameMonth(rawDate, new Date())) return currentDay(day);
        return false;
      };
    
      const isFirstDay = (day: number) => {
        if (day !== 1) return 0;
        const weekDay = getDay(
          new Date(day, rawDate.getMonth(), rawDate.getFullYear())
        );
        if (weekDay === 0) return 0;
        return weekDay + 1;
      };
    
      const previousPeriods = new Date(menstrual?.previousPeriodDate);
      const periods = new Date(menstrual?.lastPeriodStartDate);
      const nextPeriods = new Date(menstrual?.nextPeriodStartDate);
      
      previousPeriods.setDate(menstrual?.previousPeriodDate.getDate() -1);
      periods.setDate(menstrual?.lastPeriodStartDate.getDate() - 1);
      nextPeriods.setDate(menstrual?.nextPeriodStartDate.getDate() - 1);
      
      const beforePre = new Date(previousPeriods);
      const prev = new Date(periods); 
      const next = new Date(nextPeriods);
      
      const prevPeriodDays = periodTemp(beforePre);
      const periodDays = periodTemp(prev);
      const nextPeriodDays =  periodTemp(next);

      const isPreviousPeriods = (day: number) => isPeriodTemp(prevPeriodDays, day, rawDate);
      const isNextPeriods = (day: number) => isPeriodTemp(nextPeriodDays, day, rawDate)
      const isLastPeriod = (day: number) => isPeriodTemp(periodDays, day, rawDate);


    
      const isOvulationDate = (day: number) => {
        const currentDay = new Date(rawDate.getFullYear(), rawDate.getMonth(), day)
        if (isSameDay(menstrual.ovulationDate, currentDay)) return true;
        return false;
      };
    
      const isSafePeriod = (day: number) => {
        const currentDay = new Date(rawDate.getFullYear(), rawDate.getMonth(), day)
        const isWith = isWithinInterval(currentDay, {start: menstrual?.safePeriod?.before?.start, end: menstrual?.safePeriod?.before?.end})
        if (
          isWith
        )
          return true;
        return false;
      };
    
      const isFertileWindow = (day: number) => {
        const currentDay = new Date(rawDate.getFullYear(), rawDate.getMonth(), day)
        if (
          isWithinInterval(currentDay, {start: menstrual?.fertileWindow?.start, end: menstrual?.fertileWindow?.end})
        )
          return true;
        return false;
      };
    
      const isSafePeriodAfter = (day: number) => {
        const currentDay = new Date(rawDate.getFullYear(), rawDate.getMonth(), day)
        if (
          isWithinInterval(currentDay, {start: menstrual?.safePeriod?.after?.start, end: menstrual?.safePeriod?.after?.end})
        )
          return true;
        return false;
      };

      return { isSafePeriod, isCurrentDate, isFertileWindow, isSafePeriodAfter, isOvulationDate, isLastPeriod, isNextPeriods, isFirstDay, isPreviousPeriods }
}

export default useCalendar;