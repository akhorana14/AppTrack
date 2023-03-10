class CalendarUtil {
    static months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    static days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    static getMonthName(month) {
        return CalendarUtil.months[month];
    }

    static getDayName(day) {
        return CalendarUtil.days[day];
    }

    static getCalendar(month, year) {
        var calendar = [];
        for (var i = 0; i < 6; i++) {
            calendar[i] = []; 
        }

        var date = new Date(year, month);
        if (date.getDay() !== 0) date.setDate(1-date.getDay());
        for (var week = 0; week < 6; week++) {
            for (var day = 0; day < 7; day++) {
                calendar[week][day] = {
                    day: date.getDay(),
                    dayName: CalendarUtil.getDayName(date.getDay()),
                    date: date.getDate(),
                    isToday: date.getDate() === new Date().getDate() 
                        && date.getMonth() === new Date().getMonth() 
                        && date.getFullYear() === new Date().getFullYear(),
                    month: date.getMonth(),
                    monthName: CalendarUtil.getMonthName(date.getMonth()),
                    isDisplayedMonth: date.getMonth() === month 
                        && date.getFullYear() === year,
                    year: date.getFullYear()
                };
                date.setDate(date.getDate() + 1);
            }
        }

        return calendar;
    }
}

export default CalendarUtil;