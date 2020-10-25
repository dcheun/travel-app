function checkForLocation(inputText) {
  const regexp = /^.+$/;
  const match = regexp.test(inputText);

  if (!match) {
    alert('Please enter a location, ex: "Paris, France"');
    return false;
  }

  return true;
}

export { checkForLocation };
