export default function validateInput(inputText) {
  // Regular expression to match only alphanumeric characters
  const nonAlphanumericRegex = /[^a-zA-Z0-9]/g;
  const alphanumericRegex = /^[a-z0-9]+$/i;

  const cleanedString = inputText.replace(nonAlphanumericRegex, "");

  // Check if the input matches the alphanumeric regex
  if (alphanumericRegex.test(cleanedString)) {
    return true;
  }
  return false;
}
