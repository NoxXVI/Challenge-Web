// Récupération des éléments
const avatars = document.querySelectorAll('.avatar');
const selectedAvatar = document.getElementById('selected-avatar');
const retourButton = document.querySelector('.retour-button');


avatars.forEach((avatar) => {
  avatar.addEventListener('click', () => {
    const avatarSrc = avatar.getAttribute('data-avatar');
    selectedAvatar.src = avatarSrc; 
    alert(`Vous avez sélectionné un nouvel avatar !`);
  });
});


retourButton.addEventListener('click', () => {
  alert("Retour au menu principal...");
  
});
