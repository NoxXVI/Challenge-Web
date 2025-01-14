// Éléments HTML
const languageButton = document.getElementById('language-toggle');
const title = document.getElementById('title');
const brightnessLabel = document.getElementById('brightness-label');
const soundLabel = document.getElementById('sound-label');
const languageLabel = document.getElementById('language-label');
const returnButton = document.getElementById('return-button');
const brightnessSlider = document.getElementById('brightness');
const soundSlider = document.getElementById('sound');
const brightnessValue = document.getElementById('brightness-value');
const soundValue = document.getElementById('sound-value');

// Traductions
const translations = {
  FR: {
    title: 'Paramètres',
    brightnessLabel: 'Luminosité',
    soundLabel: 'Son',
    languageLabel: 'Langue',
    returnButton: 'Retour',
  },
  ENG: {
    title: 'Settings',
    brightnessLabel: 'Brightness',
    soundLabel: 'Sound',
    languageLabel: 'Language',
    returnButton: 'Back',
  },
};

// Langue actuelle
let currentLanguage = 'FR';

// Fonction pour mettre à jour la langue
function updateLanguage(language) {
  const translation = translations[language];
  title.textContent = translation.title;
  brightnessLabel.textContent = translation.brightnessLabel;
  soundLabel.textContent = translation.soundLabel;
  languageLabel.textContent = translation.languageLabel;
  returnButton.textContent = translation.returnButton;

  // Met à jour les valeurs des curseurs
  brightnessValue.textContent = `${brightnessSlider.value}%`;
  soundValue.textContent = `${soundSlider.value}%`;
}

// Écouteur pour le bouton de langue
languageButton.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'FR' ? 'ENG' : 'FR';
  languageButton.textContent = currentLanguage;
  updateLanguage(currentLanguage);
});

// Mise à jour des curseurs de luminosité et de son
brightnessSlider.addEventListener('input', () => {
  brightnessValue.textContent = `${brightnessSlider.value}%`;
});

soundSlider.addEventListener('input', () => {
  soundValue.textContent = `${soundSlider.value}%`;
});

// Initialisation de la langue par défaut
updateLanguage(currentLanguage);
