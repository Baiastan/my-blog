import React from "react";
import useDateFormat from "../../app-hooks/useDateFormat";

const DateDisplay = ({ date }) => {
  const { month, day, dayWeek, year } = useDateFormat(date);

  return (
    <div>
      <span>
        {month} {day} {dayWeek} {year}
      </span>
    </div>
  );
};

export default DateDisplay;
