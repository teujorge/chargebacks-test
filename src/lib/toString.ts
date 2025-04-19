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
  let formattedViews = views.toString();

  if (views > 1000000) {
    formattedViews = `${(views / 1000000).toFixed(1)}M views`;
  }

  if (views > 1000) {
    formattedViews = `${(views / 1000).toFixed(1)}K views`;
  }

  if (formattedViews.endsWith(".0")) {
    formattedViews = formattedViews.slice(0, -2);
  }

  return formattedViews;
}
