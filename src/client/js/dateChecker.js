function checkForDate(inputText) {
  console.log("checkForDate", inputText);

  const regexp = /^.*$/;
  const match = regexp.test(inputText);

  if (!match) {
    alert('Please enter a date in the form MM/DD/YYYY, ex: "Paris, France"');
    return false;
  }

  return true;
}

export { checkForDate };
