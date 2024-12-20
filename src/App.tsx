import { useState } from "react";
import "./App.scss";
import Period from "./components/period.tsx";

function App() {
  const [lastPeriod, setLastPeriod] = useState<Date>();
  return (
    <div>
      <h1>Menstrual Cycle Planner</h1>
      <p>When was your first day of your last menstrual period</p>
      <input
        type="date"
        onChange={(e) => setLastPeriod(new Date(e.target.value))}
      />
      {lastPeriod && (
        <Period lastPeriod={lastPeriod} setLastPeriod={setLastPeriod} />
      )}
    </div>
  );
}

export default App;
