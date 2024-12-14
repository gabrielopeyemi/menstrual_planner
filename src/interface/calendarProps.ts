export interface calendarProps {
    month: string;
    year: string;
    days: number[];
    currentDay: (e: number) => boolean;
    weeks: string[];
    onChangeMonth: (e: "plus" | "minus") => void;
    rawDate: Date;
}