"use strict"
import emailjs from 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';

const bouton = document.createElement('button');
bouton.addEventListener(click, () => {
    emailjs.sendForm('service_r255z1x', 'template_fusgldc', form)
    .then((response) => {
        console.log('Email envoyé avec succès !', response.status, response.text);
    })
    .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
    });
})
