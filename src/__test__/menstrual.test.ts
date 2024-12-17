import { test } from 'vitest';
import calculateMenstrualCycleDetails from '../utils/cycle/menstrual';

test("cal", () => {
      // Example Usage
  const lastPeriodStartDate = "2024-12-01"; // Start date of last period
  const cycleLength = 28; // Average cycle length in days
  
  const cycleDetails = calculateMenstrualCycleDetails(new Date(lastPeriodStartDate), cycleLength);
  console.log("Menstrual Cycle Details:", cycleDetails);
})