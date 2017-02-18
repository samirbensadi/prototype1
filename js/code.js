$(document).on("pagebeforecreate", "#code", function () {
  fadingContent();
  if (sessionStorage.qrcode) {
    $('#codeZone').qrcode({
      ecLevel : 'L',
      text : sessionStorage.qrcode
    });
  }

});
