import axios from 'axios';
const sendMessage = document.querySelector('.send-message');
const showError = (errorSpan, text) => {
  errorSpan.textContent = text;
  errorSpan.classList.remove(errorSpan.classList[1]);
  errorSpan.classList.add('show-error');

  // sendMessage.classList.remove(sendMessage.classList[3]);
};
const hideError = (errorSpan) => {
  // const sendMessage =  document.querySelector('.sendMessage');
  errorSpan.classList.remove(errorSpan.classList[1]);
  errorSpan.classList.add('hide-error');
  // sendMessage.classList.add('send-response');
};

const validateForm = (data, letters, idName, attr) => {
  const errorSpan = document.querySelector(`.error${attr}`);
  if (data) {
    if (!data.match(letters)) {
      let text =
        idName === 'email'
          ? 'Please enter a valid email address'
          : 'Please enter a correct input';
      showError(errorSpan, text);
    } else if (data.length < 5) {
      let text = 'Please enter atleast 5 character';
      showError(errorSpan, text);
    } else {
      hideError(errorSpan);
    }
  } else {
    let type;
    if (idName === 'name') type = 'name';
    else if (idName === 'email') type = 'email';
    else if (idName === 'subject') type = 'subject';
    else type = 'message';
    errorSpan.textContent = `Please enter ${type}`;
    errorSpan.classList.remove(errorSpan.classList[1]);
    errorSpan.classList.add('show-error');
    sendMessage.classList.remove(sendMessage.classList[3]);
  }
};

export const validate = (e) => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const messge = document.getElementById('message').value.trim();
  e.preventDefault();
  const nameLetter = /^[A-Za-z ]+$/;
  const subjectLetter = /^[A-Za-z0-9\\,\\.\\; ]+$/;
  const messageLetter = /^[A-Za-z0-9\\,\\.\\;\\!\\#\\$\\%\\&\\'\\*\\+\\/\\=\\?\\^\\_\\`\\'\\" ]+$/;
  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  validateForm(name, nameLetter, 'name', 1);
  validateForm(email, emailFormat, 'email', 2);
  validateForm(subject, subjectLetter, 'subject', 3);
  validateForm(messge, messageLetter, 'message', 4);

  const errorValidate = document.querySelectorAll('.show-error');
  if (errorValidate.length === 0) {
    sendMessage.classList.add('send-response');
  } else {
    sendMessage.classList.remove(sendMessage.classList[3]);
  }
};
