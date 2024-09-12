const formatDate = (date) => {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString() + ", " + dateObject.toTimeString().substring(0, 5)

  return formattedDate
}

export default formatDate;