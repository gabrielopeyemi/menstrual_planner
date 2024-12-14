import { getDay, isSameDay } from "date-fns";
import { isCurrentDateStyle } from "./style.cal";
import { calendarProps } from "../../interface";

export function Calendar(props: calendarProps) {
  const { month, year, weeks, days, onChangeMonth, rawDate, currentDay } =
    props;

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
              ...(isFirstDay(e) && { gridColumnStart: isFirstDay(e) }),
              ...(isCurrentDate(e) && isCurrentDateStyle),
            }}
            key={e}
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}
