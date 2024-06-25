const formattedDate = (inputDate) => {
  const date = new Date(inputDate);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

export default formattedDate;