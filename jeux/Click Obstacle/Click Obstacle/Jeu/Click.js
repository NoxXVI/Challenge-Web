// script.js
const startButton = document.getElementById("start-button");
const welcomeScreen = document.querySelector(".welcome-screen");
const gameContainer = document.querySelector(".game-container");
const circle = document.getElementById("circle");
const obstacle = document.getElementById("obstacle");
const bonus = document.getElementById("bonus");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const levelElement = document.getElementById("level");
const progressBar = document.querySelector(".progress");
const toggleNightModeButton = document.getElementById("toggle-night-mode");

let score = 0;
let level = 1;
let timeLeft = 30; // Temps de jeu en secondes
let gameInterval = null;

// Fonction pour démarrer le jeu
function startGame() {
    welcomeScreen.style.display = "none";
    gameContainer.style.display = "block";
    circle.style.display = "block";
    obstacle.style.display = "block";

    randomPosition(circle);
    randomPosition(obstacle);
    spawnBonus();
    updateProgressBar();

    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        updateProgressBar();

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}

// Fonction pour terminer le jeu
// Fonction pour terminer le jeu
function endGame() {
    alert(`Temps écoulé ! Votre score final est de ${score}`);
    
    fetch("https://api.blablagues.net/?adu=1")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données");
            }
            return response.json();
        })
        .then((json) => {
            // Vérifier et extraire les données de la blague
            const jokeHead = json.data.content.text_head || "Blague sans titre";
            const jokeBody = json.data.content.text || "Blague indisponible pour l'instant.";

            // Afficher la blague dans un prompt structuré
            const joke = `${jokeHead}\n\n${jokeBody}`;
            const userResponse = prompt("🤣 Voici une blague pour vous !\n\n" + joke + "\n\nVous aimez cette blague ? (Répondez oui ou non)");

            if (userResponse?.toLowerCase() === "oui") {
                alert("Merci ! J'en trouverai une autre pour vous bientôt. 😁");
            } else {
                alert("Oh non, désolé ! J'espère que la prochaine vous fera rire. 😅");
            }

            // Recharger la page après que l'utilisateur ait répondu
            location.reload();
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
            alert("Impossible de récupérer une blague. Vérifiez votre connexion ou réessayez plus tard.");
            
            // Même en cas d'erreur, recharger la page après avoir affiché une alerte
            location.reload();
        });
}


// Fonction pour mettre à jour la barre de progression
function updateProgressBar() {
    const progressPercentage = (timeLeft / 30) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Générer des positions aléatoires pour les éléments
function randomPosition(element) {
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;
    const elementSize = element.offsetWidth;

    // Taille de la zone de la barre de score
    const scoreBoardHeight = document.querySelector(".score-board").offsetHeight;

    // Calculer les positions aléatoires en excluant la zone de la barre de score
    const x = Math.random() * (containerWidth - elementSize); // Largeur totale
    const y = Math.random() * (containerHeight - elementSize - scoreBoardHeight) + scoreBoardHeight; // Hauteur disponible sous la barre de score

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}

function spawnBonus() {
    setInterval(() => {
        bonus.style.display = "block"; // Affiche le bonus
        randomPosition(bonus); // Place le bonus dans une position valide

        setTimeout(() => {
            bonus.style.display = "none"; // Cache le bonus après 5 secondes
        }, 5000); // Le bonus reste visible pendant 5 secondes
    }, 10000); // Apparition toutes les 10 secondes
}

// Appeler spawnBonus lorsque le jeu commence
spawnBonus();



// Gérer le clic sur le cercle
circle.addEventListener("click", () => {
    score++;
    scoreElement.textContent = score;

    randomPosition(circle);

    if (score % 5 === 0) {
        level++;
        levelElement.textContent = level;
        adjustDifficulty();
    }
});

// Gérer le clic sur l'obstacle
obstacle.addEventListener("click", () => {
    alert("Vous avez cliqué sur l'obstacle ! Partie terminée.");
    location.reload();
});


// Gérer le clic sur le bonus
bonus.addEventListener("click", () => {
    score += 5;
    scoreElement.textContent = score;
    bonus.style.display = "none";
});

// Augmenter la difficulté
function adjustDifficulty() {
    const newSize = Math.max(20, 50 - level * 5);
    circle.style.width = `${newSize}px`;
    circle.style.height = `${newSize}px`;

    if (timeLeft > 5) {
        timeLeft -= 2; // Réduction de 2 secondes par niveau
    }
}

// Déplacer l'obstacle dynamiquement
function moveObstacle() {
    setInterval(() => {
        randomPosition(obstacle);
    }, Math.max(1000 - level * 100, 300));
}

// Sauvegarder et afficher les scores
function saveScore() {
    const previousScores = JSON.parse(localStorage.getItem("scores")) || [];
    previousScores.push(score);
    localStorage.setItem("scores", JSON.stringify(previousScores));
}

function displayScores() {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    alert(`Scores précédents :\n${scores.join("\n")}`);
}

// Basculer le mode nuit
toggleNightModeButton.addEventListener("click", () => {
    document.body.classList.toggle("night-mode");
});

// Démarrer le jeu lorsque le bouton est cliqué
startButton.addEventListener("click", startGame);

// Initialiser les déplacements des obstacles
moveObstacle();
