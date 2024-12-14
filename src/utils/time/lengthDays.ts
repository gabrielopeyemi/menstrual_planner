function lengthDays (daysLength: number) {
    return Array.from({ length: daysLength }, (_, index) => index + 1)
};

export default lengthDays