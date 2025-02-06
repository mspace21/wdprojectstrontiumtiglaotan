const userText = document.getElementById("userText");
const sideBar = document.getElementById("sideBar");
const homePageContainer = document.getElementById("homePageContainer");

let userName ='';
function changeName() {
  userName = prompt("What should we call you?");
  userText.innerHTML = userName;
}

function addNote() {
  const notesContainer = document.getElementById("notesContainer");
  const note = document.createElement("div");
  note.className = "note";
  note.innerHTML = '<textarea placeholder="Empty Note"></textarea>';
  notesContainer.appendChild(note);
}

let sideBarOpen = false;
function toggleSidebar() {
  if(sideBarOpen === false) {
    sideBar.style.display = "inline";
    sideBarOpen = true;
    homePageContainer.style.width = "87.5%"
  } else if(sideBarOpen === true) {
    sideBar.style.display = "none";
    sideBarOpen = false;
    homePageContainer.style.width = "100%"
  } 
}