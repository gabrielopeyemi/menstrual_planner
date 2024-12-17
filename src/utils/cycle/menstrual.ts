function calculateMenstrualCycleDetails(startDate: Date, cycleLength = 28) {
    const lastPeriodDate = new Date(startDate);
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);
  
    // Ovulation typically occurs 14 days before the next period
    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(nextPeriodDate.getDate() - 14);
  
    // Calculate safe periods
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(ovulationDate.getDate() - 5); // 5 days before ovulation
    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(ovulationDate.getDate() + 1); // 1 day after ovulation
  
    const safePeriodBefore = {
      start: lastPeriodDate.toDateString(),
      end: new Date(fertileWindowStart.getTime() - 1 * 24 * 60 * 60 * 1000).toDateString(), // Day before fertile window starts
    };
  
    const safePeriodAfter = {
      start: new Date(fertileWindowEnd.getTime() + 1 * 24 * 60 * 60 * 1000).toDateString(), // Day after fertile window ends
      end: nextPeriodDate.toDateString(),
    };
  
    return {
      lastPeriodStartDate: lastPeriodDate.toDateString(),
      nextPeriodStartDate: nextPeriodDate.toDateString(),
      ovulationDate: ovulationDate.toDateString(),
      fertileWindow: {
        start: fertileWindowStart.toDateString(),
        end: fertileWindowEnd.toDateString(),
      },
      safePeriods: {
        before: safePeriodBefore,
        after: safePeriodAfter,
      },
    };
  }
  
export default calculateMenstrualCycleDetails;