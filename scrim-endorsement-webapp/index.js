import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://scrimba-f9950-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const databaseReference = ref(database, "user");

const mainEl = document.getElementById("main-el");
const loginEl = document.getElementById("login-el");
const toInputEl = document.getElementById("to-el");
const displayEl = document.getElementById("display-el");
const fromInputEl = document.getElementById("from-el");
const loginInputEl = document.getElementById("login-input-el");
const buttonInputEl = document.getElementById("button-el");
const loginButtonEl = document.getElementById("login-button-el");
const logoutButtonEl = document.getElementById("logout-button-el");
const endorseInputEl = document.getElementById("endorse-el");
let isliked = [];
let localUsername = "";
if (localStorage.getItem("currentUser")) {
  localUsername = localStorage.getItem("currentUser");
}

onValue(databaseReference, function (snapshot) {
  displayEl.innerHTML = "";
  if (snapshot.exists()) {
    let userDBArray = Object.entries(snapshot.val());
    for (let i = 0; i < userDBArray.length; i++) {
      const snapKey = userDBArray[i][0];
      const snapFrom = userDBArray[i][1].from;
      const snapTo = userDBArray[i][1].to;
      const snapEndorsemet = userDBArray[i][1].endorsement;
      const snapLike = userDBArray[i][1].like;
      renderEndorsement(snapFrom, snapTo, snapEndorsemet, snapLike, snapKey);
    }
  }
});

loginButtonEl.addEventListener("click", function () {
  const loginInputValue = loginInputEl.value;
  if (loginInputValue != "") {
    loginEl.classList.add("hidden");
    mainEl.classList.remove("hidden");
    localUsername = loginInputValue;
    localStorage.setItem("currentUser", localUsername);
    fromInputEl.value = localUsername;
    if (localStorage[loginInputValue]) {
      isliked = JSON.parse(localStorage.getItem(loginInputValue));
    }
  }
});

buttonInputEl.addEventListener("click", function () {
  if (
    endorseInputEl.value != "" &&
    fromInputEl.value != "" &&
    toInputEl.value != ""
  ) {
    const endorsementValue = endorseInputEl.value;
    const toValue = toInputEl.value;
    const fromValue = fromInputEl.value;
    const userObject = createObject(fromValue, toValue, endorsementValue, 0);
    push(databaseReference, userObject);
    toInputEl.value = "";
    // fromInputEl.value = "";
    endorseInputEl.value = "";
  }
});

fromInputEl.value = localUsername;

logoutButtonEl.addEventListener("click", function () {
  localUsername = "";
  localStorage.removeItem("currentUser");
  loginEl.classList.remove("hidden");
  mainEl.classList.add("hidden");
});

function createObject(fromValue, toValue, endorsementValue, likeValue) {
  const userObjectCreate = {
    from: fromValue,
    to: toValue,
    endorsement: endorsementValue,
    like: likeValue,
  };
  return userObjectCreate;
}

function renderEndorsement(
  fromValue,
  toValue,
  endorsementValue,
  like,
  keyValue
) {
  const endorseSpan = document.createElement("span");
  const endorseSpanFrom = document.createElement("h2");
  const endorseSpanTo = document.createElement("h2");
  const endorseSpanEndorsement = document.createElement("p");
  endorseSpanFrom.textContent = fromValue;
  endorseSpanEndorsement.textContent = endorsementValue;
  endorseSpanTo.textContent = toValue;
  endorseSpan.append(endorseSpanFrom);
  endorseSpan.append(endorseSpanEndorsement);
  endorseSpan.append(endorseSpanTo);
  const endorseLike = document.createElement("i");
  endorseLike.classList.add("fa-heart");
  endorseLike.classList.add("fa-solid");
  endorseLike.textContent = like;
  endorseSpan.append(endorseLike);
  endorseLike.addEventListener("click", function likeIncrement() {
    if (isliked.includes(keyValue) == false) {
      like++;
      const databaseLikeReference = ref(database, "user/" + keyValue + "/like");
      set(databaseLikeReference, like);
      isliked.push(keyValue);
      localStorage.setItem(localUsername, JSON.stringify(isliked));
    }
  });
  displayEl.append(endorseSpan);
}
