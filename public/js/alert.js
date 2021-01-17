/* eslint-disable */

export const hideAlert = () => {
  const el = document.querySelector('.custom-alert');
  if (el) el.parentElement.removeChild(el);
};
export const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="custom-alert alert--${type}" style="transition:ease;">${msg}</div>`;

  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};
