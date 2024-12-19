import { DateGroup } from "../../date.class";
import { usePeriod } from "../../hooks/time";
import useMonthDays from "../../hooks/time/useMonthDays";
import { monthChangeProps, PeriodProps } from "../../interface";
import { Calendar } from "../calendar";
import Illustration from "../calendar/illustration";

export default function Period({ lastPeriod, setLastPeriod }: PeriodProps) {
  const { days } = useMonthDays(lastPeriod.getMonth());

  const {
    lastPeriodStartDate,
    previousPeriodDate,
    nextPeriodStartDate,
    ovulationDate,
    fertileWindow,
    safePeriod,
  } = usePeriod({ tempDate: lastPeriod });

  const handleChangeMonth = (state: monthChangeProps) => {
    if (state === "plus" && nextPeriodStartDate)
      return setLastPeriod(nextPeriodStartDate);
    if (state === "minus" && previousPeriodDate)
      return setLastPeriod(previousPeriodDate);
  };

  const { currentDay, currentMonth, currentYear, weeks } = new DateGroup(
    lastPeriod
  );
  const date = {
    month: currentMonth,
    year: currentYear,
    weeks,
    day: currentDay,
    days,
    rawDate: lastPeriod,
  };

  const isCalendarReady =
    previousPeriodDate &&
    lastPeriodStartDate &&
    nextPeriodStartDate &&
    ovulationDate &&
    fertileWindow &&
    safePeriod;

  return (
    <>
      <Illustration />
      {isCalendarReady && (
        <Calendar
          calendarDate={date}
          onChangeMonth={handleChangeMonth}
          currentDay={currentDay}
          menstrual={{
            previousPeriodDate,
            lastPeriodStartDate,
            nextPeriodStartDate,
            ovulationDate,
            fertileWindow,
            safePeriod,
          }}
        />
      )}
    </>
  );
}
