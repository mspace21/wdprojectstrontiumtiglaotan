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

function calculateBMR() {
  const W = document.getElementById("weight").value;
  const H = document.getElementById("height").value;
  const A = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const exerciseLv = document.getElementById("activity").value;
  console.log(exerciseLv)

  const calculated = document.getElementById("calculatedBMR");

  let BMR;
  if(gender=="male") {
    BMR = (13.397*W) + (4.799*H) - (5.677*A) + 88.362;
  } else {
    BMR = (9.247*W) + (3.098*H) - (4.330*A) + 447.593;
  }
  switch(exerciseLv){
    case "0":
      BMR = BMR;
      break;
    case "1":
      BMR = BMR*1.18;
      break;
    case "2":
      BMR = BMR*1.32;
      break;
    case "3":
      BMR = BMR*1.442;
      break;
    case "4":
      BMR = BMR*1.5;
      break;
    case "5":
      BMR = BMR*1.6965;
      break;
  }
  console.log(`Calculated BMR is ${BMR}`);
  calculated.innerHTML = `Maintaining weight: <strong>${Math.round(BMR)}</strong> Calories/day`;
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
  { name: "Sit-up", target: "Abdominals", bodyweight: true },
  { name: "Weighted Squat", target: "Quadriceps, Glutes", bodyweight: false },
  { name: "Bodyweight Squat", target: "Quadriceps, Glutes", bodyweight: true },
  { name: "Russian Twists", target: "Abs, Obliques", bodyweight: true },
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
                          <div class="sets"></div>
                          <div class="removeExercise" onclick="removeSet(this)">x</div>`;
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




function addTask() {
  const checklist = document.getElementById("checklist");

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  taskDiv.innerHTML = `
      <input type="checkbox" onchange="toggleComplete(this)">
      <input type="text" placeholder="To-do" oninput="editTask(this)">
      <button onclick="removeTask(this)">X</button>
  `;

  checklist.appendChild(taskDiv);
}

function toggleComplete(checkbox) {
  checkbox.parentElement.classList.toggle("completed", checkbox.checked);
}

function editTask(input) {
  if (input.value.trim() === "") {
      input.placeholder = "To-do";
  }
}

function removeTask(button) {
  button.parentElement.remove();
}