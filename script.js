//---------------------------------------------
// Initialisation
//---------------------------------------------
const employeeForm = document.getElementById("employee-form");
const employeeListContainer = document.getElementById("employee-list");

let employeeList = JSON.parse(localStorage.getItem("employees")) || [];
displayEmployeeList();

//---------------------------------------------
// Gestion du formulaire
//---------------------------------------------
employeeForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const lastName = document.getElementById("nom").value.trim();
  const firstName = document.getElementById("prenom").value.trim();
  const email = document.getElementById("email").value.trim();
  const position = document.getElementById("fonction").value.trim();

  if (!lastName || !firstName || !email || !position) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Veuillez entrer une adresse email valide.");
    return;
  }

  const newEmployee = {
    id: Date.now(),
    lastName,
    firstName,
    email,
    position
  };

  employeeList.push(newEmployee);
  updateLocalStorage();
  displayEmployeeList();
  showNotification("Employé ajouté avec succès !");
  employeeForm.reset();
}

//---------------------------------------------
// Validation email
//---------------------------------------------
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

//---------------------------------------------
// Affichage des employés
//---------------------------------------------
function displayEmployeeList() {
  employeeListContainer.innerHTML = "";

  employeeList.forEach(employee => {
    const card = document.createElement("div");
    card.className = "employee-card";

    const employeeInfo = document.createElement("div");
    employeeInfo.className = "employee-info";
    employeeInfo.innerHTML = `
      <p><strong>Nom :</strong> ${employee.lastName} ${employee.firstName}</p>
      <p><strong>Email :</strong> ${employee.email}</p>
      <p><strong>Fonction :</strong> ${employee.position}</p>
    `;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", () => {
      removeEmployee(employee.id);
    });

    card.appendChild(employeeInfo);
    card.appendChild(deleteButton);
    employeeListContainer.appendChild(card);
  });
}

//---------------------------------------------
// Suppression avec confirmation
//---------------------------------------------
function removeEmployee(employeeId) {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet employé ?");
  if (!confirmation) return;

  employeeList = employeeList.filter(e => e.id !== employeeId);
  updateLocalStorage();
  displayEmployeeList();
  showNotification("Employé supprimé avec succès", "error");
}

//---------------------------------------------
// Mise à jour du localStorage
//---------------------------------------------
function updateLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employeeList));
}

//---------------------------------------------
// Affichage d'une notification pop-up
//---------------------------------------------
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification ${type === "error" ? "error" : ""} visible`;

  setTimeout(() => {
    notification.classList.remove("visible");
    notification.classList.add("hidden");
  }, 3000);
}
