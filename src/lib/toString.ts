export function uploadDateToString(date: Date) {
  const timeAgo = new Date().getTime() - date.getTime();

  const timeAgoInSeconds = timeAgo / 1000;
  const timeAgoInMinutes = timeAgoInSeconds / 60;
  const timeAgoInHours = timeAgoInMinutes / 60;
  const timeAgoInDays = timeAgoInHours / 24;
  const timeAgoInMonths = timeAgoInDays / 30;
  const timeAgoInYears = timeAgoInMonths / 12;

  const timeAgoString =
    timeAgoInYears > 2
      ? `${Math.round(timeAgoInYears)} years ago`
      : timeAgoInMonths > 2
        ? `${Math.round(timeAgoInMonths)} months ago`
        : timeAgoInDays > 2
          ? `${Math.round(timeAgoInDays)} days ago`
          : timeAgoInHours > 2
            ? `${Math.round(timeAgoInHours)} hours ago`
            : timeAgoInMinutes > 2
              ? `${Math.round(timeAgoInMinutes)} minutes ago`
              : timeAgoInSeconds > 2
                ? `${Math.round(timeAgoInSeconds)} seconds ago`
                : "just now";

  return timeAgoString;
}

export function viewsToString(views: number) {
  let formattedNumber = views.toString();
  let formattedSuffix = " views";

  if (views >= 1000000) {
    const millions = views / 1000000;
    formattedNumber = `${millions >= 100 ? Math.round(millions) : millions.toPrecision(3)}`;
    formattedSuffix = "M views";
  } else if (views >= 1000) {
    const thousands = views / 1000;
    formattedNumber = `${thousands >= 100 ? Math.round(thousands) : thousands.toPrecision(3)}`;
    formattedSuffix = "K views";
  }

  if (formattedNumber.endsWith(".0")) {
    formattedNumber = formattedNumber.slice(0, -2);
  } else if (formattedNumber.endsWith(".00")) {
    formattedNumber = formattedNumber.slice(0, -3);
  } else if (formattedNumber.includes(".") && formattedNumber.endsWith("0")) {
    formattedNumber = formattedNumber.slice(0, -1);
  }

  return `${formattedNumber}${formattedSuffix}`;
}
