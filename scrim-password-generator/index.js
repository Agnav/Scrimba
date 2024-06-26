const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

let inputEl = document.getElementById("input-el");
let displayElOne = document.getElementById("display-el-one-p");
let displayElTwo = document.getElementById("display-el-two-p");
let buttonEl = document.getElementById("button-el");
let copyEl = document.querySelectorAll(".copy-el");
let inputElValue = 0;
let passwordOne = "";
let passwordTwo = "";
let isGenerated = false;

buttonEl.addEventListener("click", function fetchInput() {
  inputElValue = Number(inputEl.value);
  generatePassword();
});

function generatePassword() {
  passwordOne = "";
  passwordTwo = "";

  for (let i = 0; i < inputElValue; i++) {
    passwordOne += characters[Math.floor(Math.random() * characters.length)];
    passwordTwo += characters[Math.floor(Math.random() * characters.length)];
  }
  displayElOne.textContent = passwordOne;
  displayElTwo.textContent = passwordTwo;
  isGenerated = true;
}

copyEl.forEach((copy) => {
  copy.addEventListener("click", function copyToClipboard() {
    if (isGenerated === true) {
      console.log(copy.id + "-p");
      navigator.clipboard.writeText(
        document.getElementById(copy.id + "-p").textContent
      );
      alert(
        "Copied the text: " +
          document.getElementById(copy.id + "-p").textContent
      );
    }
  });
});
