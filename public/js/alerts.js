/* eslint-disable */
export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// Type : is success or fail
export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div calss="alert alert--${type}">${msg}</div>`;
  `<div class="alert alert--${type}>${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};
