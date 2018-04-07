$(function() {

    mobileVsDesktop();

    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    function mobileVsDesktop() {
        if (isMobileDevice() === false){
            $('.apple').hide();
            $('.android').hide();
        } else if (isMobileDevice() === true){
            $('.login').hide();
            $('.apply').hide();
        }
    }
});