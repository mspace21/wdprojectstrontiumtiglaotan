// Function to add a new journal section
function addNewPage() {
  // Create a new section element
  const newSection = document.createElement("section");
  newSection.classList.add("journal-section");

  // Add content to the new section
  newSection.innerHTML = `
    <h2>New Journal Entry</h2>
    <div class="content" contenteditable="true">
      Content for the new journal entry. You can edit this part.
    </div>
  `;

  // Append the new section to the body or a specific container
  document.body.appendChild(newSection);
}