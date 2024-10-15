export function moneyToNumber(string) {
  // Example with a different currency sign

  // Step 1: Remove all non-numeric characters except for the decimal point
  const cleanedString = string.replace(/[^0-9.]/g, "");

  // Step 2: Convert the cleaned string to a number
  const number = parseFloat(cleanedString);

  return number;
}

export function validateEmail(email) {
  // Regular expression for validating an Email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePhoneNumber(phoneNumber) {
  // Regular expression for validating a phone number
  // This example regex checks for a phone number format like (123) 456-7890 or 123-456-7890 or 123.456.7890 or 1234567890 or +31636363634
  const regex = /^\+?(\d.*){3,}$/;
  return regex.test(phoneNumber);
}

export function cleanAndFormatCurrency(
  value,
  locale = "en-US",
  currency = "GHS",
) {
  console.log(value, typeof value);
  // Ensure the value is a string before replacing characters
  let stringValue = String(value);

  // Remove any characters that are not digits, commas, or decimals
  let cleanedValue = stringValue?.replace(/[^\d.-]/g, "");

  // Convert the cleaned string to a number
  let amount = parseFloat(cleanedValue);

  if (isNaN(amount)) {
    throw new Error("Invalid number format");
  }

  // Format the number as currency
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount,
  );
}

// Example usage
// console.log(cleanAndFormatCurrency('GHS 123,456.789')); // Output: GHS 123,456.79
// console.log(cleanAndFormatCurrency('$123,456.789', 'en-US', 'USD')); // Output: $123,456.79
// console.log(cleanAndFormatCurrency('£12,345.67', 'en-GB', 'GBP')); // Output: £12,345.67
