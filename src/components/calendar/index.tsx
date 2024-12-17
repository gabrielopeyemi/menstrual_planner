import { getDay, isSameDay } from "date-fns";
import {
  isCurrentDateStyle,
  isFertileStyle,
  isOvulationStyle,
  isPeriodStyle,
  isSafeStyle,
} from "./style.cal";
import { calendarProps } from "../../interface";

export function Calendar(props: calendarProps) {
  const { calendarDate, onChangeMonth, currentDay, menstrual } = props;
  const { month, year, weeks, days, rawDate } = calendarDate;

  const isCurrentDate = (day: number) => {
    if (isSameDay(rawDate, new Date())) return currentDay(day);
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
  const periodDays = [1, 2, 3, 4, 5].map(() => {
    const each = periods.setDate(prev.getDate() + 1);
    prev = new Date(each);
    return new Date(prev);
  });

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

  return (
    <div id="calendar" className="calendar">
      <div>
        <div className="flex center">
          <button onClick={() => onChangeMonth("minus")}>&larr;</button>
          <h1>
            {month} {year}
          </h1>
          <button onClick={() => onChangeMonth("plus")}>&rarr;</button>
        </div>
      </div>
      <div className="container center flex weeks">
        {weeks.map((e) => (
          <div key={e}>{e}</div>
        ))}
      </div>

      <div className="container center flex days">
        {days.map((e) => (
          <div
            style={{
              display: "flex",
              alignItems: " center",
              flexDirection: "column",
              justifyContent: "center",
            }}
            key={e}
          >
            <div style={{ display: "flex", gap: "2px" }}>
              <div
                style={{
                  ...(isFirstDay(e) && { gridColumnStart: isFirstDay(e) }),
                  ...(isCurrentDate(e) && {
                    color: "red",
                    textDecoration: "underline",
                  }),
                }}
              />
              <div
                style={{
                  ...(isLastPeriod(e) && isPeriodStyle),
                }}
              />
              <div
                style={{
                  ...(isOvulationDate(e) && isOvulationStyle),
                }}
              />
              <div
                style={{
                  ...(isSafePeriod(e) && isSafeStyle),
                }}
              />

              <div
                style={{
                  ...(isCurrentDate(e) && isCurrentDateStyle),
                }}
              />

              <div
                style={{
                  ...(isFertileWindow(e) && isFertileStyle),
                }}
              />
            </div>

            {e}
          </div>
        ))}
      </div>
    </div>
  );
}
