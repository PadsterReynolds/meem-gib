$(function() {

    mobileVsDesktop();

    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    function mobileVsDesktop() {
        if (isMobileDevice() === false){
            $('.apple').toggle("slow");
            $('.android').toggle("slow");
        } else if (isMobileDevice() === true){
            $('.login').toggle("slow");
            $('.apply').toggle("slow");
        }
    }
});