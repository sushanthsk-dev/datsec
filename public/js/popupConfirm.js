import axios from 'axios';
import { showAlert } from './alert';
export const popupConfirm = function (title, msg, $true, $false, type, id) {
  /*change*/
  var $content =
    "<div class='dialog-ovelay'>" +
    "<div class='dialog'><header>" +
    ' <h3> ' +
    title +
    ' </h3> ' +
    "<i class='fa fa-close'></i>" +
    '</header>' +
    "<div class='dialog-msg'>" +
    ' <p> ' +
    msg +
    ' </p> ' +
    '</div>' +
    '<footer>' +
    "<div class='controls'>" +
    " <button class='button button-danger doAction'>" +
    $true +
    '</button> ' +
    " <button class='button button-default cancelAction'>" +
    $false +
    '</button> ' +
    '</div>' +
    '</footer>' +
    '</div>' +
    '</div>';
  if (!document.querySelector('.dialog-ovelay')) {
    $('body').prepend($content);
    document.body.classList.add('stop-scrolling');
    $('.doAction').click(async function () {
      const url =
        type === 'blog' ? `/api/v1/blogs/${id}` : `/api/v1/response/${id}`;

      try {
        const res = await axios({
          method: 'DELETE',
          url: url,
        });
        if (res.data.status == undefined) {
          if (type === 'blog')
            showAlert('success', 'Blog deleted successfully');
          else showAlert('success', 'Response deleted successfully');
          window.setTimeout(() => {
            if (type === 'blog') location.assign('/admin/blogs');
            else location.assign('/admin/response');
          }, 1500);
        }
      } catch (e) {
        showAlert('error', 'Failed to delete blog. Please try again');
      }
      $(this)
        .parents('.dialog-ovelay')
        .fadeOut(500, function () {
          $(this).remove();
        });
    });
  }
  $('.cancelAction, .fa-close').click(function () {
    document.body.classList.remove('stop-scrolling');
    $(this)
      .parents('.dialog-ovelay')
      .fadeOut(500, function () {
        $(this).remove();
      });
  });
};
