function getDaysInMonth(month: number, year: number) {
    // Create a date object for the next month and set the day to 0
    return new Date(year, month, 0).getDate();
  }

  export default getDaysInMonth;