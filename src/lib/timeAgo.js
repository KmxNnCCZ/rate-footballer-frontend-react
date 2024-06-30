const timeAgo = (dateString) => {
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;

  if(diffInSeconds < 300) {
    return "たった今"
  }else if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds}秒前`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}分前`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}時間前`;
  } else {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days}日前`;
  }
};

export default timeAgo;