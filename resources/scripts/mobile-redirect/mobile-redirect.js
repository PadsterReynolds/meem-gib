$(function() {

    mobileVsDesktop();


    function mobileVsDesktop() {
        if (isMobileDevice() === true){
//            $('.apple').toggle("slow");
//            $('.android').toggle("slow");
//        } else if (isMobileDevice() === true){
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
//            $('.apple').toggle("slow");
//            $('.apple-apply').toggle("slow");
//            $('.login').toggle("slow");
//            $('.apply').toggle("slow");
            $(".login[href='https://online.meem.bh']").attr('href', 'https://play.google.com/store/apps/details?id=com.gib.meembah')
        }
        else if (checker.iphone){
//            $('.android').toggle("slow");
//            $('.android-apply').toggle("slow");
//            $('.login').toggle("slow");
//            $('.apply').toggle("slow");
            $(".login[href='https://online.meem.bh']").attr('href', 'https://itunes.apple.com/us/app/meem-bah/id1345368637?mt=8')
        }
    }

//    $(".login[href='http://www.google.com/']").attr('href', 'http://www.live.com/')


});