import { format, getDaysInMonth } from "date-fns";
import { lengthDays } from "./utils/time";

export class DateClass {
    date: Date
    static weeksDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    constructor(date: Date) {
      this.date = date
    } 

    isCurrentDay (date: number) {
        return format(new Date(), 'd') === date.toString();
    }

    get days () {
        const dayNums = getDaysInMonth(this.date.getMonth())
        return lengthDays(dayNums);
    }
    
    get today () {
        return format(new Date(), 'd')
    }

    get weeks () {
        return DateClass.weeksDays;
    }

    get month () {
        return format(this.date, 'MMMM');
    }

    get year () {
        return format(this.date, 'yyyy')
    }

    get dateExport () {
        return { month: this.month, year: this.year, weeks: this.weeks, isCurrentDay: this.isCurrentDay, days: this.days, rawDate: this.date }
    }



}