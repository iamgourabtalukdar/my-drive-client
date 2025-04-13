export function formatDate(inputDate, isTimeOutput = true) {
  const now = new Date();
  const date = new Date(inputDate);

  // Get time components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  // Check if date is today
  if (date.toDateString() === now.toDateString()) {
    return isTimeOutput ? `Today, ${formattedTime}` : "Today";
  }

  // Check if date was yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return isTimeOutput ? `Yesterday, ${formattedTime}` : "Yesterday";
  }

  // Format for other dates
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
