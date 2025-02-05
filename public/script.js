const quicknotes = document.getElementById("section1");
let isDragging = false;
let offsetX, offsetY;

quicknotes.addEventListener("mousedown", (event) => {
  isDragging = true;
  
  offsetX = event.clientX - quicknotes.getBoundingClientRect().left;
  offsetY = event.clientY - quicknotes.getBoundingClientRect().top;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    quicknotes.style.left = event.clientX - offsetX + "px";
    quicknotes.style.top = event.clientY - offsetY + "px"; 
  }
});