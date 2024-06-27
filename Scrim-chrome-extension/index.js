const notesFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"));
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tableEl = document.getElementById("tbody-el");
const deleteBtn = document.getElementById("delete-btn");
const deleteOneEl = document.querySelectorAll("#delete-one-el");
const tabBtn = document.getElementById("tab-btn");
let myNotes = [];

if (notesFromLocalStorage) {
  myNotes = notesFromLocalStorage;
  render(myNotes);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myNotes.push(tabs[0].url);
    localStorage.setItem("myNotes", JSON.stringify(myNotes));
    render(myNotes);
  });
});

function render(notes) {
  let listItems = "";
  for (let i = 0; i < notes.length; i++) {
    listItems += `
            <tr>
                <td><a target='_blank' href='${notes[i]}'>
                    ${notes[i]}
                </a><button id="delete-one-el">DELETE</button></td>
            </tr>
        `;
  }
  tableEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myNotes = [];
  render(myNotes);
});

inputBtn.addEventListener("click", function () {
  if (inputEl.value != "") {
    myNotes.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myNotes", JSON.stringify(myNotes));
    render(myNotes);
  }
});
