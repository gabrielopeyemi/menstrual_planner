import { useEffect, useState } from "react";
import calculateMenstrualCycleDetails from "../../utils/cycle/menstrual";
import { fertileWindowProps, safePeriodProps } from "../../interface";

const usePeriod = ({tempDate}: { tempDate: Date }) => {
    const [lastPeriodStartDate, setLastPeriodStartDate] = useState<Date>();
    const [nextPeriodStartDate, setNextPeriodStartDate] = useState<Date>();
    const [ovulationDate, setOvulationDate] = useState<Date>();
    const [fertileWindow, setFetileWindow] = useState<fertileWindowProps>();
  
    const [safePeriod, setSafePeriod] = useState<safePeriodProps>();
  
    const [lastMen, setLasMen] = useState<Date>();
  
    useEffect(() => {}, [tempDate]);
  
    useEffect(() => {
      if (lastMen) {
        handleMen(lastMen);
      }
    }, [tempDate, lastMen]);
  
    const handleMen = (date: Date) => {
      const result = calculateMenstrualCycleDetails(date);
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
    };

    return {
        lastPeriodStartDate,
        nextPeriodStartDate,
        ovulationDate,
        fertileWindow,
        safePeriod,
        setLasMen,
        lastMen,
        handleMen,
    }
}

export default usePeriod;