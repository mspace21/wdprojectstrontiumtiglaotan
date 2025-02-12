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

const exercises = [
  { name: "Push-up", target: "Chest, Triceps", bodyweight: true }, 
  { name: "Pull-up", target: "Back", bodyweight: true }, 
  { name: "Bench Press", target: "Chest", bodyweight: false },
  { name: "Overhead Tricep Extension", target: "Triceps", bodyweight: false },
  { name: "Dumbbell Shoulder Press", target: "Deltoids", bodyweight: false },
  { name: "Dumbbell Bicep Curl", target: "Biceps", bodyweight: false },
  { name: "Dumbbell Hammer Curl", target: "Biceps", bodyweight: false },
  { name: "Dumbbell Concentration Curl", target: "Biceps", bodyweight: false },
  { name: "Sit-up", target: "Biceps", bodyweight: true },
  { name: "Bicep Curl", target: "Biceps", bodyweight: false },
  { name: "Bicep Curl", target: "Biceps", bodyweight: false },
  { name: "Bicep Curl", target: "Biceps", bodyweight: false },
]

const exerciseSelect = document.getElementById("exerciseSelect");
const workoutPlan = document.getElementById("wktdashboardPlan");

exercises.forEach(exercise => {
  let option = document.createElement("option");
  option.value = exercise.name;
  option.textContent = `${exercise.name}`;
  exerciseSelect.appendChild(option);
});

function addExercise() {
  const selectedIndex = exerciseSelect.selectedIndex; // Get the index of selected exercise in the array exercises
  const selectedExercise = exercises[selectedIndex];

  const exerciseDiv = document.createElement("div");
  exerciseDiv.className = "exercise";
  exerciseDiv.innerHTML = `<strong>${selectedExercise.name}</strong>
                          <button onclick="addSet(this, ${selectedExercise.bodyweight})">Add Set</button>
                          <div class="sets"></div>`;
  workoutPlan.appendChild(exerciseDiv);
}


function addSet(button, isBodyweight) {
  const setsDiv = button.nextElementSibling;
  const setDiv = document.createElement("div");
  setDiv.className = "set";
  setDiv.innerHTML = `Set: <input type="number" placeholder="Reps" min="1">
                      ${!isBodyweight ? '<input type="number" placeholder="Weight (kg)" min="1">' : ""}
                      <button onclick="removeSet(this)">Remove</button>`;
  setsDiv.appendChild(setDiv);
}

function removeSet(button) {
    button.parentElement.remove();
}