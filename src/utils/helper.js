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
