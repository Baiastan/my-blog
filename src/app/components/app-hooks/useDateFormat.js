const useDateFormat = (date, customOptions = {}) => {
  const options = {
    month: "short",
    day: "numeric",
    weekday: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    hour12: true,
    ...customOptions,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).formatToParts(new Date(date));

  const dateParts = formattedDate.reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});

  const { month, day, weekday: dayWeek, year, hour, minute, dayPeriod, timeZoneName: timeZone } = dateParts;
  const time = `${hour}:${minute} ${dayPeriod.toLowerCase()}`;

  return { month, day, weekday: dayWeek, year, hour, minute, dayPeriod, timeZoneName: timeZone, time };
};

export default useDateFormat;
