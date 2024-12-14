import { useEffect, useState } from "react";
import { getDaysInMonth } from "date-fns";
import lengthDays from "../../utils/time/lengthDays";
import updateMonth from "../../utils/time/updateMonth";
export type monthChangeProps = 'plus' | 'minus';

const useTimeTrack = () => {

  const [tempDate, setTempDate] = useState(new Date());
  const [daysLength, setDaysLength] = useState(getDaysInMonth(tempDate.getMonth()))
  const [dayArr, setDayArr] = useState<number []>(lengthDays(daysLength));
  const handleChangeMonth = (state: monthChangeProps) => {
    setTempDate((pre) => updateMonth(pre, state))
  }
  
  useEffect(() => {
    setDaysLength(getDaysInMonth(tempDate))
}, [tempDate]);


useEffect(() => {
    setDayArr(lengthDays(daysLength));
  }, [tempDate, daysLength]);

  return {  handleChangeMonth, tempDate, days: { arr: dayArr, length: daysLength } }
};

export default useTimeTrack