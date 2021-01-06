// Assignment Code
let generateBtn = document.querySelector("#generate");

// password generation function
function generatePassword(userLength, lowerCase, upperCase, numeric, specialChar) {
  
  // Declare empty string to store password
  let password = "";

  // Make sure at least one of every selected option is in the password by changing the boolean value to an integer
  // to figure out which ones we need to include
  // If the boolean is true, return 1 and multiply it by 1, 2, 3, or 4 then add them up
  let sum = ((lowerCase ? 1 : 0) * 1) + ((upperCase ? 1 : 0) * 2) +
            ((numeric ? 1 : 0) * 3) + ((specialChar ? 1 : 0) * 4);

  // Variables to keep track of each type
  let lcInc = 0; let ucInc = 0; let numInc = 0; let charInc = 0;

  /* Generate password based on criteria given, generating a random ASCII code and converting it to a character */
  while (password.length < userLength) {
    // Generate random ASCII value between 33 - 126
    let value = Math.floor(Math.random() * 93) + 33;
    
    // If the value is numeric and numeric is selected
    // ASCII values (48 - 57) -> (0 - 9)
    if (value >= 48 && value <= 57 && numeric) {
      password += String.fromCharCode(value);   // Convert and put in string
      numInc = 3;
    }
    // If the value is an upper case letter and upperCase is selected
    // ASCII values (65 - 90) -> (A - Z)
    else if (value >= 65 && value <= 90 && upperCase) {
      password += String.fromCharCode(value);   // Convert and put in string
      ucInc = 2;
    }
    // If the value is a lower case letter and lowerCase is selected
    // ASCII values (97 - 122) -> (a - z)
    else if (value >= 97 && value <= 122 && lowerCase) {
      password += String.fromCharCode(value);   // Convert and put in string
      lcInc = 1;
    }
    // If the value is a special character and specialChar is selected
    // ASCII values (33 - 47) -> (! " # $ % & ' ( ) * + , - . /)
    //              (58 - 64) -> (: ; < = > ? @)
    //              (91 - 96) -> ([ \ ] ^ _ `)
    //              (123 - 126) -> ({ | } ~)
    else {
      if (((value >= 33 && value <= 47) || (value >= 58 && value <= 64) || 
          (value >= 91 && value <= 96) || (value >= 123 && value <= 126)) && specialChar) {
        password += String.fromCharCode(value);// Convert and put in string
        charInc = 4;
      }
    }
    // Password has correct length
    if (password.length == userLength) {
      // Check to make sure one of each type is in the password
      let checkedSum = lcInc + ucInc + numInc + charInc;
      
      // If it isn't, start over
      if (sum != checkedSum) {
        password = "";
        lcInc = ucInc = numInc = charInc = 0;
      }
    }
  }
  return password;
}
// Write password to the #password input
function writePassword() {
 
  let passwordText = document.querySelector("#password");

  // Get user input from text box and switch/checkboxes
  let userLength = document.getElementById("character-length").value;
  let lowerCase = document.getElementById("lower-case").checked;
  let upperCase = document.getElementById("upper-case").checked;
  let numeric = document.getElementById("numbers").checked;
  let specialChar = document.getElementById("special-characters").checked;

  if (isNaN(userLength)) {
    passwordText.setAttribute("style", "color: #FF0000; font-weight: bold;")
    passwordText.value = "*Please enter a number.*";
    return;
  }
  // Confirm password length is within the parameters (8-128)
  if (userLength < 8 || userLength > 128) {
    // Alert user
    // alert("Please choose between 8-128.");
    
    // Or manipulate the DOM
    // Change to setAttribute()
    passwordText.setAttribute("style", "color: #FF0000; font-weight: bold;")
    passwordText.value = "*Please choose between 8-128.*";
    return;
  }
  
  // Confirm at least one of the switch/checkboxes was selected
  if (!lowerCase && !upperCase && !numeric && !specialChar) {
    // Alert user
    // alert("Please select one of the switch options.");

    // Or manipulate the DOM
    passwordText.setAttribute("style", "color: #FF0000; font-weight: bold;")
    passwordText.value = "*Please select at least one of the switch options.*";
    return;
  }
  // User input verified, generate password
  let password = generatePassword(userLength, lowerCase, upperCase, numeric, specialChar);
 
  // If we choose to manipulate the DOM above, set back to black, normal
  passwordText.setAttribute("style", "color: #000000; font-weight: normal;")

  // Write password to DOM
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
