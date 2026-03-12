// Step 1: Variables and Data Types

let ngoName = "Shajar Hope Alliance"; // String

let volunteers = 30; // Number

let acceptingDonations = true; // Boolean

let programs = ["Scholarships", "Community Support", "Mentorship"]; // Array

let founder = { // Object
name: "Ayesha Masood",
city: "Lahore"
};


// Step 2: Display Variables Using DOM

document.getElementById("ngoName").innerHTML =
"NGO Name: " + ngoName;

document.getElementById("volunteers").innerHTML =
"Total Volunteers: " + volunteers;

document.getElementById("donations").innerHTML =
"Accepting Donations: " + acceptingDonations;

document.getElementById("programs").innerHTML =
"Programs: " + programs.join(", ");

document.getElementById("founder").innerHTML =
"Founder: " + founder.name + " (" + founder.city + ")";


// Step 3: Arrow Function

const showSummary = () => {

let message =
"Our NGO " + ngoName +
" runs " + programs.length +
" programs with " +
volunteers +
" volunteers helping students.";

document.getElementById("summary").innerHTML = message;

};