export const getCurrentTime24 = () =>
  new Intl.DateTimeFormat('ko', {
    timeStyle: 'short',
    hour12: false,
  }).format(new Date());

export const getTimestamp = () => new Date().getTime();
