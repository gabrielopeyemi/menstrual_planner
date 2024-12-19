export type monthChangeProps = 'plus' | 'minus';
export interface PeriodProps {
  lastPeriod: Date;
  setLastPeriod: (date: Date) => void;
}

export interface dateProps {
    month: string;
    year: string;
    weeks: string[];
    days: number [];
    rawDate: Date;
}

export interface fertileWindowProps {
    start: Date;
    end: Date;
  }
  
export interface safePeriodProps {
    before: fertileWindowProps;
    after: fertileWindowProps;
  }

export interface menstrualProps {
    previousPeriodDate: Date,
    lastPeriodStartDate: Date,
    nextPeriodStartDate: Date,
    ovulationDate: Date,
    fertileWindow: fertileWindowProps,
    safePeriod: safePeriodProps,
}


export interface calendarProps {
    currentDay: (e: number) => boolean;
    calendarDate: dateProps,
    onChangeMonth: (e: "plus" | "minus") => void;
    menstrual: menstrualProps
}