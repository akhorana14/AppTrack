class CalendarUtil {
    constructor(month, year) {
        this.calendar = [];
        for (var i = 0; i < 6; i++) {
            this.calendar[i] = []; 
        }

        // each calendar day should store day, date, month, year
    }

    get calendar() {
        return this.calendar;
    }
}

export default CalendarUtil;