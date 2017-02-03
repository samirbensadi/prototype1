$(document).on(pageEvent, "#code", function () {

  if (sessionStorage.qrcode) {
    $('#codeZone').qrcode({
      ecLevel : 'L',
      text : sessionStorage.qrcode
    });
  }

});
