'use strict';
const bouton = document.createElement('button');
bouton.addEventListener(click, () => {
    
    .then((response) => {
        console.log('Email envoyé avec succès !', response.status, response.text);
    })
    .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
    });
})