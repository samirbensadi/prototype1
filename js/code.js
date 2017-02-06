$(document).on("pagebeforecreate", "#code", function () {
  loading();
  if (sessionStorage.qrcode) {
    $('#codeZone').qrcode({
      ecLevel : 'L',
      text : sessionStorage.qrcode
    });
  }

});
