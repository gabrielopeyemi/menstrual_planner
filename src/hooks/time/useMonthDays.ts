import { useEffect, useState } from "react";
import { getDaysInMonth } from "date-fns";
import lengthDays from "../../utils/time/lengthDays";

interface IUseMonthDay {
  daysNum: number, days: number[]
}

const useMonthDays = (month: number): IUseMonthDay => {
  const [daysNum, setDaysNum] = useState<number>(getDaysInMonth(month))
  const [days, setDays] = useState<number []>(lengthDays(daysNum));
 
  useEffect(() => {
    if (month)
    setDaysNum(getDaysInMonth(month))
}, [month]);


useEffect(() => {
    setDays(lengthDays(daysNum));
  }, [month, daysNum]);

  
  return { daysNum, days }
};

export default useMonthDays