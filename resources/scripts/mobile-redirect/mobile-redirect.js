$(function() {

    mobileVsDesktop();


    function mobileVsDesktop() {
        if (isMobileDevice() === false){
            $('.apple').toggle("slow");
            $('.android').toggle("slow");
        } else if (isMobileDevice() === true){
            customizeForDevice()
        }
    }

    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    function customizeForDevice(){
        var ua = navigator.userAgent;
        var checker = {
            iphone: ua.match(/(iPhone|iPod|iPad)/),
            android: ua.match(/Android/)
        };
        if (checker.android){
            $('.apple').toggle("slow");
            $('.apple-apply').toggle("slow");
            $('.login').toggle("slow");
            $('.apply').toggle("slow");
        }
        else if (checker.iphone){
            $('.android').toggle("slow");
            $('.android-apply').toggle("slow");
            $('.login').toggle("slow");
            $('.apply').toggle("slow");
        }
    }


});