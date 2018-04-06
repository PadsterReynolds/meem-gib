$(function() {

    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
    console.log(isMobileDevice())

    function mobileVsDesktop() {
        if (isMobileDevice() === false){
            $('.apple').prepend("Login");
            $('.android').prepend("Apply Now")
        } else if (isMobileDevice() === true){
            $('.apple').prepend("ISO Login");
            $('.android').prepend("Android Login")
        }
    }
});