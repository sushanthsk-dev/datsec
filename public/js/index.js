/* eslint-disable */
import '@babel/polyfill';
import { validate } from './validateForm';
import { login } from './login';
import { logout } from './login';
import { forgotPassword } from './login';
import { popupConfirm } from './popupConfirm';
import { visibilityControl } from './visibilityControl';
import { createBlog } from './contactResponse';
import { updateBlog } from './contactResponse';
import { contactResponse } from './contactResponse';
import { resetPassword } from './login';
const contactForm = document.querySelector('.send-message');
const btnCreateSteps = document.querySelector('.btnCreateSteps');
const loginForm = document.querySelector('.form-user-login');
const forgotPasswordForm = document.querySelector('.form-user-password-forgot');
const resetPasswordForm = document.querySelector('.form-user-password-reset');
const logoutBtn = document.querySelector('.logout-btn');
const btnSaveBlogVisibility = document.querySelectorAll('.btn-save');
const createBlogForm = document.querySelector('.create-blog-form');
const editBlogForm = document.querySelector('.edit-blog-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (btnCreateSteps)
  btnCreateSteps.addEventListener('click', (e) => {
    e.preventDefault();
    let step = document.getElementById('sel1').value;
    for (let i = step; i >= 1; i--) {
      let stepDiv = document.createElement('div');
      let stepLabel = document.createElement('label');
      let wrongIcon = document.createElement('i');
      stepDiv.className = `step-containers step-container${i}`;
      let br = document.createElement('br');
      let stepDescription = document.createElement('input');
      let stepFile = document.createElement('input');
      stepFile.type = 'file';
      stepFile.className = 'form-control stepImgFile';
      stepFile.name = `stepImgFile${i}`;
      stepFile.id = `stepImgFile${i}`;
      stepLabel.for = `stepDescription${i}`;
      stepLabel.innerText = 'Step Description';
      stepDescription.className = 'form-control';
      stepDescription.type = 'text';
      stepDescription.name = `stepDescription${i}`;
      stepDescription.id = `stepDescription${i}`;
      stepDescription.className = 'form-control stepDescription';
      wrongIcon.className = 'wrong-icon fa fa-times';
      wrongIcon.setAttribute('aria-hidden', 'true');
      wrongIcon.setAttribute('onclick', 'javascript:remove(this);');
      stepDiv.appendChild(br);
      stepDiv.appendChild(stepLabel);
      stepDiv.appendChild(stepDescription);
      stepDiv.appendChild(stepFile);
      stepDiv.appendChild(wrongIcon);
      document
        .querySelector('.steps')
        .insertAdjacentElement('beforeend', stepDiv);
    }
  });

if (document.querySelector('.wrong-icon')) {
}
// function remove(data) {
//   document.querySelector('.wrong-icon').parentElement.remove();
// }

if (contactForm) {
  contactForm.addEventListener('click', (e) => {
    validate(e);
    e.preventDefault();

    if (document.querySelector('.send-message').classList[3]) {
      if (
        document.querySelector('.send-message').classList[3] == 'send-response'
      ) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        e.target.textContent = 'Sending...';
        contactResponse(name, email, subject, message);
      }
    }
  });
}

const allBtnDlt = document.querySelectorAll('.btn-delete');
allBtnDlt.forEach((btn) => {
  btn.addEventListener('click', function () {
    const id = this.getAttribute('arial-id');
    popupConfirm(
      `Delete blog`,
      'Are you sure you want to Delete this blog',
      'Yes',
      'Cancel',
      id
    );
  });
});

// const selectVisibility = () =>
//   document
//     .querySelector('.select-form-visibility')
//     .addEventListener('change', () => {});

if (btnSaveBlogVisibility) {
  btnSaveBlogVisibility.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const selectedVisibilty = btn.parentElement.querySelector(
        '.select-form-visibility'
      );
      // const selectedVisibilty = document.querySelector(
      //   '.select-form-visibility'
      // );
      e.preventDefault();
      // const value =
      //   selectedVisibilty.selectedIndex === 0 ? 'private' : 'public';
      const blogVisibility = this.getAttribute('arial-id').split('-')[1];
      if (!(blogVisibility === selectedVisibilty.selectedIndex)) {
        const id = this.getAttribute('arial-id').split('-')[0];
        visibilityControl(id, selectedVisibilty.selectedIndex);
      }
    });
  });
}

if (createBlogForm) {
  createBlogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const imageCover = document.getElementById('blogImage').files[0];
    const content = document.getElementById('content').value;

    if (document.querySelector('.step-containers')) {
      var stepsDescription = new Array();
      var stepsImg = new Array();
      const len = document.querySelectorAll('.stepDescription');
      document.querySelectorAll('.stepDescription').forEach((el) => {
        stepsDescription.push(el.value);
      });
      document.querySelectorAll('.stepImgFile').forEach((el) => {
        stepsImg.push(el.files[0]);
      });
    }
    const form = new FormData();
    form.append('title', title);
    form.append('imageCover', imageCover);
    form.append('content', content);
    if (stepsDescription) {
      stepsDescription.forEach((step) => {
        form.append('stepsDescription', step);
      });
      stepsImg.forEach((img) => {
        form.append('stepsImg', img);
      });
    }
    createBlog(form);
  });
}
if (document.querySelector('.btnEditBlog'))
  document.querySelector('.btnEditBlog').addEventListener('click', (e) => {
    e.preventDefault();
    const id = editBlogForm.getAttribute('arial-id');

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const imageCover = document.getElementById('blogImage').files[0];

    const form = new FormData();
    form.append('title', title);
    if (imageCover) form.append('imageCover', imageCover);
    form.append('content', content);
    updateBlog(form, id);
  });

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  });
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const token = window.location.pathname.split('/')[3];

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    resetPassword(password, confirmPassword, token);
  });
}
