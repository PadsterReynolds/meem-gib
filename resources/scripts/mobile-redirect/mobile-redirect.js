$(function() {

//    mobileVsDesktop();

    var customizeForDevice = function(){
        var ua = navigator.userAgent;
        var checker = {
            iphone: ua.match(/(iPhone|iPod|iPad)/),
            android: ua.match(/Android/)
        };
        if (checker.android){
            $('.android').append("hello");
        }
        else if (checker.iphone){
            $('.iphone').append("hello");
        }
    }
    
//    function isMobileDevice() {
//        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
//    }

//    function mobileVsDesktop() {
//        if (isMobileDevice() === false){
//            $('.apple').toggle("slow");
//            $('.android').toggle("slow");
//        } else if (isMobileDevice() === true){
//            $('.login').toggle("slow");
//            $('.apply').toggle("slow");
//        }
//    }
//});