function alert(text){
    $('#toast').html(text).show();
    setTimeout(function(){
        $('#toast').hide();
    },1000)
}
// var k_url = 'http://192.168.1.3/hdl-test/test1';
// var k_url = 'http://www.i7quan.com/test/k.html';
var k_url = 'http://web.hdlkg.net/k.html';
var work = $.connection.myHub;
$.connection.hub.url = 'http://139.196.236.139:1818/lcc';
var hub = $.connection.hub;
hub.start().done(function () {
    setInterval(function(){
        window.work.server.品种行情()
    },1000)
});
var home_data;
work.client.GetFSData = function (data) {
    home_data = data;
};
