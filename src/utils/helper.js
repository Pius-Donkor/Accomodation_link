export function moneyToNumber(string) {
  // Example with a different currency sign

  // Step 1: Remove all non-numeric characters except for the decimal point
  const cleanedString = string.replace(/[^0-9.]/g, "");

  // Step 2: Convert the cleaned string to a number
  const number = parseFloat(cleanedString);

  return number;
}
