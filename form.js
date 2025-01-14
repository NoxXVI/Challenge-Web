// import emailjs from "./node_modules/emailjs";

<<<<<<< HEAD
const bouton = document.getElementById('bouton');
console.log(bouton);
bouton.addEventListener(SubmitEvent, () => {
=======
import emailjs from "./node_modules/emailjs";

const bouton = document.createElement('button');
bouton.addEventListener(click, () => {
>>>>>>> 8ddae0ce752abe980d49b3081d50318b7f33be15
    emailjs.sendForm('service_r255z1x', 'template_fusgldc', form)
    .then((response) => {
        console.log('Email envoyé avec succès !', response.status, response.text);
    })
    .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
    });
    bouton.preventDefault()
})


