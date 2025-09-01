export const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const hourNum = parseInt(hour, 10);
  const period = hourNum >= 12 ? "PM" : "AM";
  const formattedHour = hourNum % 12 || 12;
  return `${formattedHour}:${minute} ${period}`;
};
