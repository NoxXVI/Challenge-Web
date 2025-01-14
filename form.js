"use strict"

import emailjs from "./node_modules/emailjs";

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
