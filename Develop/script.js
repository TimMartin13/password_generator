// Assignment Code
let generateBtn = document.querySelector("#generate");

// password generation function
function generatePassword() {
  // Get length of password requested
  let userLength = 1;
  // Ensure length is between 8 - 128 characters
  while (userLength < 8 || userLength > 128) {
    userLength = prompt("How many characters would you like? (Between Min 8 -  Max 128)");
  }
  
  // Declare variables for password criteria
  let selected = 0;
  let lowerCase = false;
  let upperCase = false;
  let numeric = false;
  let specialChar = false;

  // Continue to prompt user for criteria until at least one is given
  while (!selected) {
    lowerCase = confirm("Would you like lower case letters?");
    upperCase = confirm("Would you like upper case letters?");
    numeric = confirm("Would you like numbers?");
    specialChar = confirm("Would you like special characters?");

    // console.log("lowerCase = " + lowerCase);
    // console.log("upperCase = " + upperCase);
    // console.log("numeric = " + numeric);
    // console.log("specialChar = " + specialChar);

    // Check to see if one of the options was selected
    if (lowerCase || upperCase || numeric || specialChar) {
      selected = 1;
    }
    // If none of the options are selected, try again
    else {
      alert("You must select one of the options.");
    }  
  }
  
  // Declare empty string to store password
  let password = "";

  /* Generate password based on criteria given, generating a random ASCII code and converting it to a character */
  while (password.length < userLength) {
    // Generate random ASCII value between 33 - 126
    let value = Math.floor(Math.random() * 93) + 33;
    
    // If the value is numeric and numeric is selected
    if (value >= 48 && value <= 57 && numeric) {
      password += String.fromCharCode(value);   // Convert and put in string
    }
    // If the value is an upper case letter and upperCase is selected
    else if (value >= 65 && value <= 90 && upperCase) {
      password += String.fromCharCode(value);   // Convert and put in string
    }
    // If the value is a lower case letter and lowerCase is selected
    else if (value >= 97 && value <= 122 && lowerCase) {
      password += String.fromCharCode(value);   // Convert and put in string
    }
    // If the value is a special character and specialChar is selected
    else {
      if (((value >= 33 && value <= 47) || (value >= 58 && value <= 64) || 
          (value >= 91 && value <= 96) || (value >= 123 && value <= 126)) && specialChar) {
        password += String.fromCharCode(value);// Convert and put in string
      }
    }
    // console.log(value);
    // console.log(password);
  }
  return password;
}
// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
