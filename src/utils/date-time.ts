export const formatDateTime = (timestamp: string | number | Date, fullYear: boolean = true) => {
  const date = new Date(timestamp);

  const formattedDate = date
    .toLocaleDateString('en-SG', {
      day: '2-digit',
      month: 'short',
      year: fullYear ? 'numeric' : '2-digit',
    })
    .replace(',', '');

  const formattedTime = date.toLocaleTimeString('en-SG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
};
