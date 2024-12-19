import { getDay, isSameMonth } from "date-fns";
import { menstrualProps } from "../interface";

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
    
      const periods = new Date(menstrual?.lastPeriodStartDate);
      let prev = periods;
      const periodDays = [0, 1, 1, 1, 1].map((e) => {
        const each = periods.setDate(prev.getDate() + e);
        prev = new Date(each);
        return new Date(prev);
      });
    
      const nextPeriods = new Date(menstrual?.nextPeriodStartDate);
      let next = nextPeriods;
      const nextPeriodDays = [0, 1, 1, 1, 1].map((e) => {
        const each = nextPeriods.setDate(next.getDate() + e);
        next = new Date(each);
        return new Date(prev);
      });

      const previousPeriods = new Date(menstrual?.previousPeriodDate);
      let previous = previousPeriods;
      const prevPeriodDays = [0, 1, 1, 1, 1].map((e) => {
        const each = previousPeriods.setDate(previous.getDate() + e);
        previous = new Date(each);
        return new Date(prev);
      });

      const isPreviousPeriods = (day: number) => {
        const isFound = prevPeriodDays.find(
          (each) => each.getDate() === day && each.getMonth() === rawDate.getMonth()
        );
        if (isFound) {
          return true;
        }
        return false;
      };
      
    
      const isNextPeriods = (day: number) => {
        const isFound = nextPeriodDays.find(
          (each) => each.getDate() === day && each.getMonth() === rawDate.getMonth()
        );
        if (isFound) {
          return true;
        }
        return false;
      };
    
      const isLastPeriod = (day: number) => {
        const isFound = periodDays.find((each) => each.getDate() === day);
        if (isFound) {
          return true;
        }
        return false;
      };
    
      const isOvulationDate = (day: number) => {
        if (menstrual?.ovulationDate?.getDate() === day) return true;
        return false;
      };
    
      const isSafePeriod = (day: number) => {
        console.log(menstrual?.safePeriod?.after?.end.toDateString());
        if (
          day >= menstrual?.safePeriod?.before?.start?.getDate() &&
          day <= menstrual?.safePeriod?.before?.end?.getDate()
        )
          return true;
        return false;
      };
    
      const isFertileWindow = (day: number) => {
        if (
          day >= menstrual?.fertileWindow?.start?.getDate() &&
          day <= menstrual?.fertileWindow?.end?.getDate()
        )
          return true;
        return false;
      };
    
      const isSafePeriodAfter = (day: number) => {
        if (
          day >= menstrual?.safePeriod?.after?.start?.getDate() &&
          day <= menstrual?.safePeriod?.after?.end?.getDate() &&
          rawDate?.getMonth() === menstrual?.safePeriod?.after?.start?.getMonth()
        )
          return true;
        return false;
      };

      return { isSafePeriod, isCurrentDate, isFertileWindow, isSafePeriodAfter, isOvulationDate, isLastPeriod, isNextPeriods, isFirstDay, isPreviousPeriods }
}

export default useCalendar;