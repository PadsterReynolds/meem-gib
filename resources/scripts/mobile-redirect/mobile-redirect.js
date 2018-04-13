$(function() {

    mobileVsDesktop();


    function mobileVsDesktop() {
        if (isMobileDevice() === true){
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
            $(".login[href='https://online.meem.bh']").attr('href', 'https://play.google.com/store/apps/details?id=com.gib.meembah')
            $(".apply[href='https://online.meem.bh']").attr('href', 'https://play.google.com/store/apps/details?id=com.gib.meembah')
        }
        else if (checker.iphone){
            $(".login[href='https://online.meem.bh']").attr('href', 'https://itunes.apple.com/us/app/meem-bah/id1345368637?mt=8')
            $(".apply[href='https://online.meem.bh']").attr('href', 'https://itunes.apple.com/us/app/meem-bah/id1345368637?mt=8')
        }
    }

});