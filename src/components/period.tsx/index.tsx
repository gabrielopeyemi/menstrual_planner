import { DateClass } from "../../date.class";
import { usePeriod } from "../../hooks/time";
import { monthChangeProps, PeriodProps } from "../../interface";
import { Calendar } from "../calendar";
import Illustration from "../calendar/illustration";

export default function Period({ lastPeriod, setLastPeriod }: PeriodProps) {
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

  const { dateExport } = new DateClass(lastPeriod);

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
          calendarDate={dateExport}
          onChangeMonth={handleChangeMonth}
          currentDay={dateExport.isCurrentDay}
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
