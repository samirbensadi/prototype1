var server = "localhost";

function checkChangeMdp() {
    var oldMdp = $("#oldMdp").val();
    var mdpParam = $('#newMdp').val();
    var mdpParamConf = $('#newMdpConf').val();
    
    if (mdpParam == mdpParamConf && mdpParam.length > 5 && oldMdp.length > 5) {
        $('#btnSaveMdp').prop("disabled", false);
    } else  {
        $('#btnSaveMdp').prop("disabled", true);
    }
}

function disconnect() {
        localStorage.clear();
        sessionStorage.clear();
        $.mobile.changePage("../index.html", {transition : "slide", reverse: true});
}
