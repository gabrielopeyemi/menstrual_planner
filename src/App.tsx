import { useEffect, useState } from "react";
import "./App.scss";
import { Calendar } from "./components/calendar";
import { DateGroup } from "./date.class";
import { useTimeTrack } from "./hooks/time";
import calculateMenstrualCycleDetails from "./utils/cycle/menstrual";
import { fertileWindowProps, safePeriodProps } from "./interface";

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

  const [lastPeriodStartDate, setLastPeriodStartDate] = useState<Date>();
  const [nextPeriodStartDate, setNextPeriodStartDate] = useState<Date>();
  const [ovulationDate, setOvulationDate] = useState<Date>();
  const [fertileWindow, setFetileWindow] = useState<fertileWindowProps>();

  const [safePeriod, setSafePeriod] = useState<safePeriodProps>();

  const [lastMen, setLasMen] = useState<Date>();

  useEffect(() => {
    if (lastMen) {
      const result = calculateMenstrualCycleDetails(lastMen);
      setLastPeriodStartDate(new Date(result.lastPeriodStartDate));
      setNextPeriodStartDate(new Date(result.nextPeriodStartDate));
      setOvulationDate(new Date(result.ovulationDate));
      setFetileWindow({
        start: new Date(result.fertileWindow.start),
        end: new Date(result.fertileWindow.end),
      });
      setSafePeriod({
        before: {
          start: new Date(result.safePeriods.before.start),
          end: new Date(result.safePeriods.before.end),
        },
        after: {
          start: new Date(result.safePeriods.after.start),
          end: new Date(result.safePeriods.after.end),
        },
      });
    }
  }, [tempDate, lastMen]);

  return (
    <>
      <div>
        <h1>Menstrual Cycle Planner</h1>
        <p>today is {dateFn.today}</p>
        {nextPeriodStartDate?.toDateString()}
        <p>When was your first day of your last menstrual period</p>
        <input
          type="date"
          onChange={(e) => setLasMen(new Date(e.target.value))}
        />
        {lastMen && (
          <>
            <div
              style={{
                display: "flex",
                margin: "1em 0",
                textAlign: "center",
                gap: "2em",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <p>Current day</p>
                <div
                  style={{
                    color: "red",
                    height: "2em",
                    width: "2em",
                    background: "red",
                    borderRadius: "100%",
                  }}
                />
              </div>
              <div>
                <p>Fetile period</p>
                <div
                  style={{
                    color: "green",
                    height: "2em",
                    width: "2em",
                    background: "green",
                    borderRadius: "100%",
                  }}
                />
              </div>

              <div>
                <p>safe period</p>
                <div
                  style={{
                    height: "2em",
                    width: "2em",
                    background: "black",
                    borderRadius: "100%",
                  }}
                />
              </div>

              <div>
                <p>menstrual period</p>
                <div
                  style={{
                    height: "2em",
                    width: "2em",
                    background: "tomato",
                    borderRadius: "100%",
                  }}
                />
              </div>

              <div>
                <p>ovulation period</p>
                <div
                  style={{
                    height: "2em",
                    width: "2em",
                    background: "blue",
                    borderRadius: "100%",
                  }}
                />
              </div>
            </div>
            {lastPeriodStartDate &&
              nextPeriodStartDate &&
              ovulationDate &&
              fertileWindow &&
              safePeriod && (
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
