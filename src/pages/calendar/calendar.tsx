import { useState, useEffect } from "react";
import { dayName } from "../../model/model";

import "./calendar.scss";

const Calendar = () => {
  const [days, setDays] = useState<boolean[]>([]);
  const [daysBefore, setDaysBefore] = useState<boolean[]>([]);
  const [daysAfter, setDaysAfter] = useState<boolean[]>([]);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const getDays = () => {
    const dayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = new Array(dayOfMonth).fill(false);
    setDays(days);
  };

  const getDaysBefore = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Array(firstDay - 1).fill(false);
    setDaysBefore(days);
  };

  const getDaysAfter = (year: number, month: number) => {
    const lastDay = new Date(year, month + 1, 0).getDay();
    const days = new Array(7 - lastDay).fill(false);
    setDaysAfter(days);
  };

  useEffect(() => {
    getDaysBefore(currentYear, currentMonth);
    getDaysAfter(currentYear, currentMonth);
    getDays();
  }, []);

  return (
    <div className="calendar page-container">
      <div className="table">
        <div className="thead">
          <div className="row">
            {dayName.map((day, index) => (
              <div className="col head" key={index}>
                {day.full}
              </div>
            ))}
          </div>
        </div>

        <div className="tbody">
          <div className="row">
            {daysBefore.map((day, index) => (
              <div className="col expand" key={index}></div>
            ))}

            {days.map((day, index) => (
              <div className="col" key={index}>
                {index + 1}
              </div>
            ))}

            {daysAfter.map((day, index) => (
              <div className="col expand" key={index}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
