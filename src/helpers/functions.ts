export const editTimeString = (str: string) => {
  let arr = str.split(" ");
  let day = arr[0].split("-").slice(1).reverse().join(".");
  let time = arr[1].split(":").slice(0, -1).join(":");
  return `${day} ${time}`;
};
