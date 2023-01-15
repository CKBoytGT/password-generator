// Assignment Code
const generateBtn = document.querySelector("#generate"),
// Character types
lowercaseChar = "abcdefghijklmnopqrstuvwxyz",
uppercaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
numberChar = "0123456789",
specialChar = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

function generatePassword() {
  // Final generated password
  let finalPassword = "";

  // (1) Ask user for the password length
  function chooseLength() {
    let lengthChoice = window.prompt(
      "Please choose a password length from 8 to 128:"
    );

    // If the user cancels, end the function
    if (!lengthChoice) {
      return;
      // If the user input is invalid (not a number, too low or too high), alert and start this part over
    } else if (isNaN(lengthChoice) || lengthChoice < 8 || lengthChoice > 128) {
      let lengthRestart = window.confirm(
        "You must choose a number from 8 to 128. Would you like to try again?"
      );
      // Restart from chooseLength if confirmed
      if (lengthRestart) {
        chooseLength();
      // Otherwise, end
      } else {
        return;
      }

      // (2) If password length is valid, proceed to choosing character types
    } else {
      function chooseChars() {
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

        // If the string of characters is empty (user chose nothing), alert and restart just the character choice part
        if (!charsChosen) {
          let charsRestart = window.confirm(
            "You must choose at least one character type. Would you like to try again?"
          );
          // Restart from chooseChars if confirmed
          if (charsRestart) {
            chooseChars();
            // Otherwise, end
          } else {
            return;
          }

          // If the user chose at least one character type, build the final password from the length and characters chosen
        } else {
          // Split the string of chosen characters into an array
          let charArray = charsChosen.split("");

          // Add a random character from the possible choices to the final password until it is the length the user chose
          for (let i = 0; i < lengthChoice; i++) {
            // Generate a random whole number from 0 to the total number of available characters
            let random = Math.floor(Math.random() * charsChosen.length);
            // Add a random character from the array to the final password
            finalPassword += charArray[random];
          }
        }
      }

      // Call chooseChars as part of chooseLength
      chooseChars();
    }
  }

  // Call chooseLength as part of generatePassword
  chooseLength();
  return finalPassword;
}

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
  
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);