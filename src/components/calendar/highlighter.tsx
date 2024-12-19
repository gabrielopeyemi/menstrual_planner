import useCalendar from "../../hooks/useCalendar";
import { menstrualProps } from "../../interface";
import {
  isCurrentDateStyle,
  isFertileStyle,
  isOvulationStyle,
  isPeriodStyle,
  isSafeStyle,
} from "./style.cal";

interface highlighterProps {
  rawDate: Date;
  menstrual: menstrualProps;
  currentDay: (day: number) => void;
  e: number;
}

export default function Highligher({
  rawDate,
  menstrual,
  currentDay,
  e,
}: highlighterProps) {
  const {
    isCurrentDate,
    isFertileWindow,
    isFirstDay,
    isLastPeriod,
    isOvulationDate,
    isSafePeriod,
    isSafePeriodAfter,
  } = useCalendar(rawDate, menstrual, currentDay);

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      <div
        style={{
          ...(isFirstDay(e) && { gridColumnStart: isFirstDay(e) }),
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
          ...(isSafePeriodAfter(e) && isSafeStyle),
        }}
      />

      <div
        style={{
          ...(isCurrentDate(e) ? isCurrentDateStyle : {}),
        }}
      />

      <div
        style={{
          ...(isFertileWindow(e) && isFertileStyle),
        }}
      />
    </div>
  );
}
