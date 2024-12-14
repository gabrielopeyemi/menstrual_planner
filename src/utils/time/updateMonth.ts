import { monthChangeProps } from "../../hooks/time/useTimeTrack";

function updateMonth (pre: Date, state: monthChangeProps) {
    const newDate = new Date(pre);
      if (state === "plus") {
        newDate.setMonth(pre.getMonth() + 1);
      } else {
        newDate.setMonth(pre.getMonth() - 1);
      }
      return newDate;
}

export default updateMonth;