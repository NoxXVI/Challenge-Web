document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    // Réinitialisation des erreurs
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    // Validation du nom
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('nameError').textContent = 'Le nom est requis.';
        isValid = false;
    }

    // Validation de l'email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Veuillez entrer un email valide.';
        isValid = false;
    }

    // Validation du message
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        document.getElementById('messageError').textContent = 'Le message est requis.';
        isValid = false;
    }

    // Validation du consentement
    const consent = document.getElementById('consent').checked;
    if (!consent) {
        document.getElementById('consentError').textContent = 'Vous devez accepter la politique de confidentialité.';
        isValid = false;
    }

    if (isValid) {
        alert('Formulaire envoyé avec succès !');
        // Soumettre le formulaire ou effectuer d'autres actions
    }
});
