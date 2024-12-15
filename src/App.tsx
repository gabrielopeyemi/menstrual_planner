import "./App.scss";
import { Calendar } from "./components/calendar";
import { DateGroup } from "./date.class";
import { useTimeTrack } from "./hooks/time";

function App() {
  const { tempDate, handleChangeMonth, ...rest } = useTimeTrack();
  const { arr, length } = rest.days;
  const dateFn = new DateGroup(tempDate);

  return (
    <>
      <div>
        <h1>Menstrual Cycle Planner</h1>
        <p>today is {dateFn.today}</p>
        <p>
          {dateFn.currentMonth} has {length} days
        </p>
        <Calendar
          month={dateFn.currentMonth}
          rawDate={tempDate}
          year={dateFn.currentYear}
          currentDay={dateFn.currentDay}
          weeks={dateFn.weeks}
          days={arr}
          onChangeMonth={handleChangeMonth}
        />
      </div>
    </>
  );
}

export default App;
