import { format } from "date-fns";

export class DateGroup {
    date: Date
    static weeksDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    constructor(date: Date) {
      this.date = date
    }   

    get currentMonth () {
        return format(this.date, 'MMMM');
    }

    get currentYear () {
        return format(this.date, 'yyyy')
    }

    get today () {
        return format(new Date(), 'd')
    }

    get weeks () {
        return DateGroup.weeksDays;
    }

    currentDay (date: number) {
        return format(new Date(), 'd') === date.toString();
    }
}