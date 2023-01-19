// Assignment Code
const generateBtn = document.querySelector("#generate"),
// Character types
lowercaseChar = "abcdefghijklmnopqrstuvwxyz",
uppercaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
numberChar = "0123456789",
specialChar = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

// Ask user for the password length
function chooseLength() {
  let lengthChoice = window.prompt(
    "Please choose a password length from 8 to 128:"
  );

  // If the user cancels, quit
  if (!lengthChoice) {
    return;
  // If the user input is invalid (not a number, too low or too high), alert and quit
  } else if (isNaN(lengthChoice) || lengthChoice < 8 || lengthChoice > 128) {
    window.alert(
      "You must choose a number from 8 to 128. Please try again."
    );
    return;
  // If input is valid, return the chosen length
  } else {
    return lengthChoice;
  }
}

// After chosing length, ask user for character types
function chooseChars(length) {
  // If no length was chosen, quit without displaying any prompts
  if (!length) {
    return;
  // Otherwise, give the choices
  } else {
    // String of all possible character options for the final password
    let charsChosen = "";

    // Add each character type to the string of chosen characters if confirmed
    let includeLowercase = window.confirm(
      "Would you like to include lowercase letters?"
    );
    if (includeLowercase) {
      charsChosen = charsChosen + lowercaseChar;
    }
    let includeUppercase = window.confirm(
      "Would you like to include uppercase letters?"
    );
    if (includeUppercase) {
      charsChosen = charsChosen + uppercaseChar;
    }
    let includeNumbers = window.confirm(
      "Would you like to include numbers?"
    );
    if (includeNumbers) {
      charsChosen = charsChosen + numberChar;
    }
    let includeSpecial = window.confirm(
      "Would you like to include special characters?"
    );
    if (includeSpecial) {
      charsChosen = charsChosen + specialChar;
    }

    // If the string of characters is empty (user chose nothing), alert and quit
    if (!charsChosen) {
      window.alert(
        "You must choose at least one character type. Please try again."
      );
      return;
    // If the user chose at least one character type, return the full character string
    } else {
      return charsChosen;
    }
  }
}

// Based on length choice and character choice, generate the final password
function generatePassword() {
  let length = chooseLength();
  let chars = chooseChars(length);
  let finalPassword = "";

  // Return nothing if at least one of the two choice variables is undefined
  if (!length || !chars) {
    return null; // "null" prevents a result of "undefined" in the text field without removing the placeholder
  // Otherwise, build the final password
  } else {
    // Split string of characters into an array
    let charArray = chars.split("");

    // Add a random character from the possible choices to the final password until it is the length the user chose
    for (let i = 0; i < length; i++) {
      // Generate a random whole number from 0 to the total number of available characters
      let random = Math.floor(Math.random() * chars.length);
      // Add a random character from the array to the final password
      finalPassword += charArray[random];
    }

    return finalPassword;
  }
}

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
  
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);