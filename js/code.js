$(document).on("pagebeforecreate", "#code", function () {

  if (sessionStorage.qrcode) {
    $('#codeZone').qrcode(sessionStorage.qrcode);
  }

});
