import { useState, useEffect } from "react";
import { dayName, monthName } from "../../model/model";
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import TodayIcon from "@mui/icons-material/Today";
import Tooltip from "@mui/material/Tooltip";
import zoom from "@mui/material/Zoom";

import "./calendar.scss";

const Calendar = () => {
  const [days, setDays] = useState<boolean[]>([]);
  const [daysBefore, setDaysBefore] = useState<boolean[]>([]);
  const [daysAfter, setDaysAfter] = useState<boolean[]>([]);
  const [selectDay, setSelectDay] = useState(new Date());
  const [selectShow, setSelectShow] = useState<string>("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const todayDate = () => {
    setSelectDay(new Date());
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  };

  const selectCheck = (index: number) => {
    let yes = false;
    if (
      index + 1 === selectDay.getDate() &&
      currentMonth === selectDay.getMonth() &&
      currentYear === selectDay.getFullYear()
    ) {
      yes = true;
    }
    return yes;
  };

  const handleDateSelect = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day + 1).toString().slice(3, 16);
    setSelectShow(date);
    setSelectDay(new Date(year, month, day + 1));
  };

  const handlePrevClick = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextClick = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const getDays = () => {
    const dayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = new Array(dayOfMonth).fill(false);
    setDays(days);
  };

  const getDaysBefore = (year: number, month: number) => {
    const DOWNum = new Date(year, month, 1).getDay();
    const firstDay = DOWNum === 0 ? 1 : DOWNum;
    const days = new Array(firstDay - 1).fill(false);
    setDaysBefore(days);
  };

  const getDaysAfter = (year: number, month: number) => {
    const DOWNum = new Date(year, month + 1, 0).getDay();
    const lastDay = DOWNum === 0 ? 7 : DOWNum;
    const days = new Array(7 - lastDay).fill(false);
    setDaysAfter(days);
  };

  useEffect(() => {
    getDaysBefore(currentYear, currentMonth);
    getDaysAfter(currentYear, currentMonth);
    getDays();
  }, [currentYear, currentMonth]);

  return (
    <div className="calendar page-container">
      <div className="table-toolbar">
        <div className="date">
          {monthName[currentMonth]} {currentYear}
        </div>
        <div className="navigate">
          <Tooltip
            title="Today"
            placement="top"
            TransitionComponent={zoom}
            arrow
          >
            <span>
              <IconButton
                className="button"
                color="primary"
                onClick={todayDate}
                disabled={
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear()
                }
              >
                <TodayIcon />
              </IconButton>
            </span>
          </Tooltip>
          <IconButton color="primary" onClick={handlePrevClick}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleNextClick}>
            <NavigateNextIcon />
          </IconButton>
        </div>
      </div>

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
              <div
                className={selectCheck(index) ? "col selected" : "col"}
                key={index}
                onClick={() =>
                  handleDateSelect(index, currentMonth, currentYear)
                }
              >
                {index + 1}
              </div>
            ))}

            {daysAfter.map((day, index) => (
              <div className="col expand" key={index}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="date-show">
        <h3>
          Your select date :
          {selectShow ? selectShow : new Date().toString().slice(3, 16)}
        </h3>
      </div>
    </div>
  );
};

export default Calendar;
