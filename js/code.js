$(document).on("pagebeforecreate", "#code", function () {

  if (sessionStorage.qrcode) {
    $('#codeZone').qrcode({
      ecLevel : 'L',
      text : sessionStorage.qrcode
    });
  }

});
