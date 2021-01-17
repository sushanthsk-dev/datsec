import axios from 'axios';
import { showAlert } from './alert';
export const popupConfirm = function (title, msg, $true, $false, id) {
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
  $('body').prepend($content);
  document.body.classList.add('stop-scrolling');
  $('.doAction').click(async function () {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `/api/v1/blogs/${id}`,
      });
      if (res.data.status == undefined) {
        showAlert('success', 'Blog deleted successfully');
        window.setTimeout(() => {
          location.assign('/admin/blogs');
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
  $('.cancelAction, .fa-close').click(function () {
    document.body.classList.remove('stop-scrolling');
    $(this)
      .parents('.dialog-ovelay')
      .fadeOut(500, function () {
        $(this).remove();
      });
  });
};
