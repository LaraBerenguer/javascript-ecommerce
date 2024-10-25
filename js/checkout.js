
// Exercise 6
function validate() {
	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");

	// Validate fields entered by the user: name, phone, password, and email
	let lettersAndSpace = /[a-zA-Z ]/gm;
	let numbers = /[0-9]/gm;
	let numbersAndLetters = /[a-zA-Z0-9]/gm;

	//Name
	if (fName.value == "" || fName.value.length < 3 || !fName.value.match(lettersAndSpace)) {
		error++;
		fName.classList.add("is-invalid");
	}

	//Surname
	if (fLastN.value == "" || fLastN.value.length < 3 || !fLastN.value.match(lettersAndSpace)) {
		error++;
		fLastN.classList.add("is-invalid");		
	}

	//Mail
	if (fEmail.value == "" || fEmail.value.length < 3) {
		error++;
		fEmail.classList.add("is-invalid");		
	}

	//Address
	if (fAddress.value == "") {
		error++;
		fAddress.classList.add("is-invalid");		
	}

	//Password
	if (fPassword.value == "" || fPassword.value.length < 4 || fPassword.value.length > 8 || !fPassword.value.match(numbersAndLetters)) {
		error++;
		fPassword.classList.add("is-invalid");		
	}

	//Phone
	if (fPhone.value == "" || fPhone.value.length < 3 || !fPhone.value.match(numbers)) {
		error++;
		fPhone.classList.add("is-invalid");		
	}

	//Errors	
	if (error > 0) {
		alert("Please fix the errors in the form.");
	} else {
		alert("All good! Submiting form.")
	}
}
