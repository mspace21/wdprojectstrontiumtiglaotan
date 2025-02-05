const quicknotes = document.getElementById("section1")
quicknotes.addEventListener("mousemove", (event) => {
  quicknotes.style.left = event.pageX + 10 + "px";
  quicknotes.style.top = event.pageY + 10 + "px"; 
})


