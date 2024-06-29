const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("button-el");
const lengthEl = document.getElementById("length-el");
const volumeEl = document.getElementById("volume-el");
const massEl = document.getElementById("mass-el");

buttonEl.addEventListener("click", function () {
  let inputValue = inputEl.value;
  if (inputValue != "") {
    findLength(inputValue);
    findVolume(inputValue);
    findMass(inputValue);
  }
});

function findLength(value) {
  const lengthRatio = 3.281;
  let lenghtInMeters = (value / lengthRatio).toFixed(3);
  let lenthInFeets = (value * lengthRatio).toFixed(3);
  lengthEl.textContent = ` ${value} meters = ${lenthInFeets} feets | ${value} feets = ${lenghtInMeters} meters`;
}

function findVolume(value) {
  const volumeRatio = 0.264;
  let volumeINLiters = (value / volumeRatio).toFixed(3);
  let volumeInGallons = (value * volumeRatio).toFixed(3);
  volumeEl.textContent = ` ${value} liters = ${volumeInGallons} gallons | ${value} gallons = ${volumeINLiters} liters`;
}

function findMass(value) {
  const massRatio = 2.204;
  let massinKilograms = (value / massRatio).toFixed(3);
  let massInPounds = (value * massRatio).toFixed(3);
  massEl.textContent = ` ${value} kilograms = ${massInPounds} pounds | ${value} pounds = ${massinKilograms} kilograms`;
}
