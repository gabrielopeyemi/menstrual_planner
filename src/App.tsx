import "./App.scss";
import { Calendar } from "./components/calendar";
import Illustration from "./components/calendar/illustration";
import { DateGroup } from "./date.class";
import { usePeriod, useTimeTrack } from "./hooks/time";

function App() {
  const { tempDate, handleChangeMonth, ...rest } = useTimeTrack();
  const { arr } = rest.days;
  const dateFn = new DateGroup(tempDate);
  const date = {
    month: dateFn.currentMonth,
    year: dateFn.currentYear,
    weeks: dateFn.weeks,
    day: dateFn.currentDay,
    days: arr,
    rawDate: tempDate,
  };

  const {
    lastPeriodStartDate,
    nextPeriodStartDate,
    setLasMen,
    lastMen,
    ovulationDate,
    fertileWindow,
    safePeriod,
  } = usePeriod({ tempDate });

  const isCalendarReady =
    lastPeriodStartDate &&
    nextPeriodStartDate &&
    ovulationDate &&
    fertileWindow &&
    safePeriod;

  return (
    <>
      <div>
        <h1>Menstrual Cycle Planner</h1>
        <p>Today is {dateFn.today}</p>
        <p>When was your first day of your last menstrual period</p>
        <input
          type="date"
          defaultValue={lastMen?.toDateString()}
          onChange={(e) => setLasMen(new Date(e.target.value))}
        />
        {lastMen && (
          <>
            <Illustration />
            {isCalendarReady && (
              <Calendar
                calendarDate={date}
                onChangeMonth={handleChangeMonth}
                currentDay={dateFn.currentDay}
                menstrual={{
                  lastPeriodStartDate,
                  nextPeriodStartDate,
                  ovulationDate,
                  fertileWindow,
                  safePeriod,
                }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
