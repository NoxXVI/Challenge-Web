// JavaScript pour le menu principal de Uno

const currencyButton = document.querySelector('.currency-button');
const playButton = document.querySelector('.play-button');
const avatarButton = document.querySelector('.avatar-button');
const settingsButton = document.querySelector('.settings-button');


let currency = 50;


currencyButton.addEventListener('click', () => {
  currency += 50;
  alert(`Vous avez maintenant ${currency} Z !`);
});


playButton.addEventListener('click', () => {
  alert('Démarrage du jeu...');
  
});


avatarButton.addEventListener('click', () => {
  alert('Redirection vers la sélection d’avatar...');
  
});


settingsButton.addEventListener('click', () => {
  alert('Ouverture des paramètres...');
  
});
