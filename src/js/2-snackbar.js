"use strict";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', createOrRemovePromise);

function createOrRemovePromise(event) {
  event.preventDefault();
  const inputNumber = Number(event.currentTarget.delay.value);
  const inputRadioValue = event.currentTarget.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputRadioValue == 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${inputNumber}ms`);
      } else {
        reject(`❌ Rejected promise in ${inputNumber}ms`);
      }
    }, inputNumber);
  })
    .then(value => {
      console.log(value);
      iziToast.success({
        title: 'OK',
        message: value,
      });
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        title: 'Error',
        message: error,
      });
    });
}
