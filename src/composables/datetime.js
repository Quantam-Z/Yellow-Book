import moment from "moment";
export const now = () => {
  return moment().format("YYYY-MM-DD hh:mm A");
};
export const isBetweenTime = (start_time, end_time) => {
  if (start_time && end_time) return moment().isBetween(start_time, end_time);

  return false;
};
export const isBeforeTime = (time) => {
  if (time) return moment().isSameOrBefore(time, "minutes");

  return false;
};
export const isAfterTime = (time) => {
  if (time) return moment().isSameOrAfter(time, "minutes");

  return false;
};
export const getDuration = (end_time) => {
  const currentDate = moment().format("YYYY-MM-DD hh:mm:ss");
  let diffDuration = moment.duration(
    moment(end_time).diff(moment(currentDate))
  );

  let left = "";
  if (diffDuration.months() > 0) {
    return (left = `${diffDuration.months()} Months ${diffDuration.days()} Days ${diffDuration.hours()} Hours ${diffDuration.minutes()} Minutes`);
  } else if (diffDuration.days() > 0) {
    return (left = `${diffDuration.days()} Days ${diffDuration.hours()} Hours ${diffDuration.minutes()} Minutes`);
  } else if (diffDuration.hours() > 0) {
    return (left = `${diffDuration.hours()} Hours ${diffDuration.minutes()} Minutes`);
  } else if (diffDuration.minutes() > 0) {
    return (left = `${diffDuration.minutes()} Minutes`);
  } else if (diffDuration.seconds() > 0) {
    return (left = `${diffDuration.seconds()} Seconds`);
  } else {
    return (left = "Closed");
  }
};

export const humanReadableTime = (time) => {
  return moment(time).format("lll");
};

export const instantDuration = (end_time) => {
  const time = moment(end_time, "YYYY-MM-DD hh:mm:ss:aa").fromNow();
  return time;
};
