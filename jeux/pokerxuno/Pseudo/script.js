
const pseudoForm = document.getElementById('pseudo-form');
const settingsButton = document.getElementById('settings-button');


pseudoForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const pseudo = document.getElementById('pseudo').value.trim();
  
  if (pseudo) {
    alert(`Bienvenue, ${pseudo} !`);
    
  } else {
    alert("Veuillez entrer un pseudo !");
  }
});


settingsButton.addEventListener('click', () => {
  alert("Ouverture des paramètres...");
  
});
