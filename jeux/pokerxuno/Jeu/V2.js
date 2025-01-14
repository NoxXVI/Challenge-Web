// Variables globales
const minBet = 5; // Mise minimale
let currentBet = 0; // Mise actuelle
let totalBet = 0; // Mise totale cumulative

// Sélection des éléments HTML
const betInput = document.getElementById('bet-input');
const placeBetButton = document.getElementById('place-bet-button');
const playerChips = document.getElementById('chips-player-1');
const deck = document.getElementById('deck');
const activeCard = document.getElementById('active-card');
const playerCardsContainer = document.getElementById('cartes-joueur-1');
const totalBetDisplay = document.getElementById('total-bet');

const cardsDeck = ['7 Rouge', '8 Vert', '9 Bleu', '+2 Jaune', 'Joker Noir'];
const playerCards = [];

// Liste des joueurs
const players = [
    { id: 'player-1', chips: 100, bet: 0 },
    { id: 'player-2', chips: 90, bet: 0 },
    { id: 'player-3', chips: 80, bet: 0 },
    { id: 'player-4', chips: 70, bet: 0 },
];

// Fonction pour ajouter des cartes au joueur
function addCardToPlayer(card) {
    playerCards.push(card);

    // Crée une carte visuelle
    const cardElement = document.createElement('div');
    cardElement.classList.add('carte', 'joueur-bas');
    cardElement.textContent = card;

    // Ajoute un effet d'animation
    cardElement.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    cardElement.addEventListener('mouseover', () => {
        cardElement.style.transform = 'scale(1.1)';
        cardElement.style.boxShadow = '0px 4px 12px rgba(255, 215, 0, 0.8)';
    });
    cardElement.addEventListener('mouseout', () => {
        cardElement.style.transform = 'scale(1)';
        cardElement.style.boxShadow = 'none';
    });

    // Ajoute la carte au conteneur
    playerCardsContainer.appendChild(cardElement);
    
    // Met à jour l’éventail des cartes
    updateCardFan();
    // Active la sélection des cartes
    enableCardSelection();
}

// Fonction pour activer la sélection des cartes
function enableCardSelection() {
    const cards = document.querySelectorAll('.cartes-en-main .carte');
    const totalCards = cards.length;

    cards.forEach((card, index) => {
        const angle = ((index - (totalCards - 1) / 2) * 15); // Ajuste l'angle
        // Événement clic pour sélectionner une carte
        card.addEventListener('click', () => {
            // Désélectionne toutes les cartes
            cards.forEach((c) => c.classList.remove('active'));

            // Active la carte cliquée
            card.classList.add('active');
        });
    });
}

// Fonction pour piocher une carte
deck.addEventListener('click', () => {
    if (cardsDeck.length > 0) {
        const newCard = cardsDeck.pop();
        addCardToPlayer(newCard);

        // Change la carte active pour simuler une action
        activeCard.src = 'chemin/vers/carte-active.png'; // Remplacez par le chemin de votre image
        alert(`Vous avez pioché une carte : ${newCard}`);
    } else {
        alert('Le paquet de cartes est vide.');
    }
});

// Fonction pour appliquer l'éventail dynamique
function updateCardFan() {
    const cards = document.querySelectorAll('.cartes-en-main .carte');
    const totalCards = cards.length;

    cards.forEach((card, index) => {
        // Calcul dynamique de l'angle pour chaque carte
        const angle = ((index - (totalCards - 1) / 2) * 15); // Ajuste l'angle pour répartir les cartes
        card.style.transform = `rotate(${angle}deg)`;
    });
}
// Fonction pour distribuer les cartes dynamiquement en éventail
function updateCardFan() {
    const cards = document.querySelectorAll('.cartes-en-main .carte');
    const totalCards = cards.length;

    // Calcule les angles pour chaque carte
    cards.forEach((card, index) => {
        const angle = -20 + (40 / (totalCards - 1)) * index; // Ajuste les angles pour l'éventail
        const offsetX = (index - (totalCards - 1) / 2) * 50; // Décale les cartes horizontalement

        card.style.transform = `translateX(${offsetX}%) rotate(${angle}deg)`;
        card.style.zIndex = index + 1; // Gère l'empilement
    });
}

// Appelle cette fonction après avoir ajouté des cartes
function addCardToPlayer(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('carte');
    cardElement.textContent = card;
    playerCardsContainer.appendChild(cardElement);

    updateCardFan(); // Met à jour l’éventail après ajout
}
// Ajoute une carte et met à jour l’éventail
function addCardToPlayer(card) {
    playerCards.push(card);

    // Crée une carte visuelle
    const cardElement = document.createElement('div');
    cardElement.classList.add('carte', 'joueur-bas');
    cardElement.textContent = card;

    // Ajoute un effet d'animation
    cardElement.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    cardElement.addEventListener('mouseover', () => {
        cardElement.style.transform += ' scale(1.2) translateY(-20px)';
        cardElement.style.boxShadow = '0px 4px 12px rgba(255, 215, 0, 0.8)';
    });
    cardElement.addEventListener('mouseout', () => {
        updateCardFan(); // Réinitialise la position pour conserver l'éventail
        cardElement.style.boxShadow = 'none';
    });

    // Ajoute la carte au conteneur
    playerCardsContainer.appendChild(cardElement);

    // Met à jour l’éventail des cartes
    updateCardFan();
}
// Met à jour la mise totale affichée
function updateTotalBet() {
    totalBetDisplay.textContent = totalBet;
}

// Assurez-vous que les éléments HTML existent
if (!betInput || !placeBetButton) {
    console.error('Les éléments HTML bet-input ou place-bet-button sont introuvables.');
} else {
    // Gérer la mise du joueur
    placeBetButton.addEventListener('click', () => {
        const player = players[0]; // Joueur actuel
        const betAmount = parseInt(betInput.value, 10);

        // Vérifiez que la mise est valide
        if (isNaN(betAmount) || betAmount < 5) {
            alert("Veuillez entrer un montant valide.");
            return;
        }

        if (betAmount > 0 && betAmount <= player.chips) {
            // Ajoutez la mise
            player.bet += betAmount;
            player.chips -= betAmount;

            // Mettez à jour l'affichage
            document.getElementById('chips-player-1').textContent = player.chips;
            totalBet += betAmount;
            totalBetDisplay.textContent = totalBet;

            updateTotalBet();

            // Réinitialisez l'entrée utilisateur
            betInput.value = '';
        } else {
            alert("Montant invalide ou insuffisant.");
        }
    });
}

// Initialiser la mise totale
updateTotalBet();

// Fonction d'initialisation : Ajoute les cartes de départ et met à jour l’éventail
function initializeGame() {
    addCardToPlayer('7 Rouge');
    addCardToPlayer('8 Vert');
    addCardToPlayer('9 Bleu');
    addCardToPlayer('+2 Jaune');
    addCardToPlayer('Joker Noir');
}

initializeGame();
