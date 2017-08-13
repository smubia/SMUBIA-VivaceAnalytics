//**********************************
//Misc Stuff
//**********************************

$(document).ready(function () {
    setInterval(function () {
        var today = new Date();
        $("#currentTime").text(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    }, 1000);
})