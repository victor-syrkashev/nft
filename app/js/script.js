const form = document.querySelector('.modal__window__container-form');
const input = document.querySelector('.modal__window__container-form-input');
const headerBannerBtn = document.querySelector('.header__banner-button');
const header = document.querySelector('.header__nav');
const modalWindow = document.querySelector('.modal');
const modalMenu = document.querySelector('.modalMenu');
const closeBtnMenu = document.querySelector('.modalMenu__logo-btn');
const closeBtnModal = document.querySelector(
  '.modal__window__container-close-btn'
);
const burgerMenuBtn = document.querySelector('.header__logo-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  input.value = '';
});

headerBannerBtn.addEventListener('click', () => {
  modalWindow.classList.add('modal--show');
});

closeBtnModal.addEventListener('click', () => {
  modalWindow.classList.remove('modal--show');
});

burgerMenuBtn.addEventListener('click', () => {
  modalMenu.style.cssText = 'opacity: 1; visibility: visible';
});

closeBtnMenu.addEventListener('click', () => {
  modalMenu.style.cssText = 'opacity: 0; visibility: hidden';
});
