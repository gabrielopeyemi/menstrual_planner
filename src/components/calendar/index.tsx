import { calendarProps } from "../../interface";
import Highligher from "./highlighter";

export function Calendar(props: calendarProps) {
  const { calendarDate, onChangeMonth, currentDay, menstrual } = props;
  const { month, year, weeks, days, rawDate } = calendarDate;

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
            <Highligher
              rawDate={rawDate}
              menstrual={menstrual}
              currentDay={currentDay}
              e={e}
            />

            {e}
          </div>
        ))}
      </div>
    </div>
  );
}
