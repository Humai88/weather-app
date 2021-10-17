export const editTimeString = (str: string) => {
  let arr = str.split(" ");
  let day = arr[0].split("-").slice(1);
  switch (day[0]) {
    case "01":
      day[0] = "Jan";
      break;
    case "02":
      day[0] = "Feb";
      break;
    case "03":
      day[0] = "Mar";
      break;
    case "04":
      day[0] = "Apr";
      break;
    case "05":
      day[0] = "May";
      break;
    case "06":
      day[0] = "June";
      break;
    case "07":
      day[0] = "July";
      break;
    case "08":
      day[0] = "Aug";
      break;
    case "09":
      day[0] = "Sept";
      break;
    case "10":
      day[0] = "Oct";
      break;
    case "11":
      day[0] = "Nov";
      break;
    case "12":
      day[0] = "Dec";
      break;
  }
  let finalDay = day.join(", ");

  let time = arr[1].split(":").slice(0, -1).join(":");
  return `${finalDay} ${time}`;
};
